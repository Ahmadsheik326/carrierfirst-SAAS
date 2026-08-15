// actions/lanes.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { notifyUser } from '@/actions/notifications';

export async function getLanes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lanes')
    .select('id, origin, destination, equipment_type, carrier_rate, notes, status, approval_status, created_at')
    .eq('status', 'active')
    .eq('approval_status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getLanes error:', error);
    return [];
  }
  return data || [];
}

export async function getAssignedLanesForCarrier() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('lanes')
    .select('id, origin, destination, equipment_type, carrier_rate, notes, status, updated_at')
    .eq('assigned_carrier_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('getAssignedLanesForCarrier error:', error);
    return [];
  }
  return data || [];
}

export async function getMyLanes() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('lanes')
    .select('*, lane_interests(count), assigned_carrier:assigned_carrier_id(full_name, email, phone)')
    .eq('posted_by', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getMyLanes error:', error);
    return [];
  }
  return data || [];
}

export async function getAllLanesForBroker() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lanes')
    .select('*, lane_interests(count), poster:posted_by(full_name, email, role), assigned_carrier:assigned_carrier_id(full_name, email, phone)')
    .neq('approval_status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAllLanesForBroker error:', error);
    return [];
  }
  return data || [];
}

export async function getPendingLanesForBroker() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lanes')
    .select('*, poster:posted_by(full_name, email, phone)')
    .eq('approval_status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getPendingLanesForBroker error:', error);
    return [];
  }
  return data || [];
}

export async function createLane(input: {
  origin: string;
  destination: string;
  equipment_type: string;
  target_rate: number;
  notes?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in');

  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  const isBroker = ['broker_admin', 'broker_staff', 'super_admin'].includes(profile?.role || '');

  const { data: lane, error } = await supabase
    .from('lanes')
    .insert({
      posted_by: user.id,
      origin: input.origin,
      destination: input.destination,
      equipment_type: input.equipment_type,
      target_rate: input.target_rate,
      carrier_rate: isBroker ? input.target_rate : null,
      notes: input.notes || null,
      approval_status: isBroker ? 'approved' : 'pending',
    })
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  // Notify every broker when a shipper posts a new lane needing approval
  if (!isBroker) {
    const { data: brokers } = await supabase
      .from('users')
      .select('id')
      .in('role', ['broker_admin', 'broker_staff', 'super_admin']);

    for (const broker of brokers || []) {
      await notifyUser({
        userId: broker.id,
        type: 'load_status_changed',
        title: 'New lane pending approval',
        body: `${input.origin} → ${input.destination} needs a carrier rate and approval.`,
        link: '/lanes',
      });
    }
  }

  revalidatePath('/lanes');
}

export async function approveLane(laneId: string, carrierRate: number) {
  const supabase = await createClient();

  const { data: lane, error } = await supabase
    .from('lanes')
    .update({ approval_status: 'approved', carrier_rate: carrierRate, updated_at: new Date().toISOString() })
    .eq('id', laneId)
    .select('origin, destination, posted_by')
    .single();

  if (error) throw new Error(error.message);

  if (lane?.posted_by) {
    await notifyUser({
      userId: lane.posted_by,
      type: 'lane_approved',
      title: 'Your lane was approved',
      body: `${lane.origin} → ${lane.destination} is now live for carriers.`,
      link: '/lanes',
    });
  }

  revalidatePath('/lanes');
}

export async function rejectLane(laneId: string) {
  const supabase = await createClient();

  const { data: lane, error } = await supabase
    .from('lanes')
    .update({ approval_status: 'rejected', updated_at: new Date().toISOString() })
    .eq('id', laneId)
    .select('origin, destination, posted_by')
    .single();

  if (error) throw new Error(error.message);

  if (lane?.posted_by) {
    await notifyUser({
      userId: lane.posted_by,
      type: 'lane_rejected',
      title: 'Your lane was rejected',
      body: `${lane.origin} → ${lane.destination} was not approved.`,
      link: '/lanes',
    });
  }

  revalidatePath('/lanes');
}

export async function expressInterest(laneId: string, message?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in');

  const { error } = await supabase.from('lane_interests').insert({
    lane_id: laneId,
    carrier_id: user.id,
    message: message || null,
  });

  if (error) throw new Error(error.message);

  // Notify brokers that a carrier expressed interest
  const { data: lane } = await supabase
    .from('lanes')
    .select('origin, destination')
    .eq('id', laneId)
    .single();

  const { data: brokers } = await supabase
    .from('users')
    .select('id')
    .in('role', ['broker_admin', 'broker_staff', 'super_admin']);

  for (const broker of brokers || []) {
    await notifyUser({
      userId: broker.id,
      type: 'carrier_interested',
      title: 'A carrier is interested in a lane',
      body: lane ? `${lane.origin} → ${lane.destination}` : undefined,
      link: '/lanes',
    });
  }

  revalidatePath('/lanes');
}

export async function getInterestsForLane(laneId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lane_interests')
    .select('*, carrier:carrier_id(full_name, email, phone)')
    .eq('lane_id', laneId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getInterestsForLane error:', error);
    return [];
  }
  return data || [];
}

export async function assignLaneToCarrier(laneId: string, carrierId: string, interestId: string) {
  const supabase = await createClient();

  const { data: lane, error: laneErr } = await supabase
    .from('lanes')
    .update({ status: 'filled', assigned_carrier_id: carrierId, updated_at: new Date().toISOString() })
    .eq('id', laneId)
    .select('origin, destination, posted_by')
    .single();
  if (laneErr) throw new Error(laneErr.message);

  await supabase
    .from('lane_interests')
    .update({ status: 'accepted', updated_at: new Date().toISOString() })
    .eq('id', interestId);

  await supabase
    .from('lane_interests')
    .update({ status: 'rejected', updated_at: new Date().toISOString() })
    .eq('lane_id', laneId)
    .neq('id', interestId);

  // Notify the assigned carrier
  await notifyUser({
    userId: carrierId,
    type: 'lane_assigned',
    title: "You've been assigned a lane",
    body: lane ? `${lane.origin} → ${lane.destination}` : undefined,
    link: '/lanes',
  });

  // Notify the shipper who posted it
  if (lane?.posted_by) {
    await notifyUser({
      userId: lane.posted_by,
      type: 'lane_assigned',
      title: 'Your lane was filled',
      body: lane ? `${lane.origin} → ${lane.destination} now has a carrier assigned.` : undefined,
      link: '/lanes',
    });
  }

  revalidatePath('/lanes');
}

export async function updateLaneStatus(laneId: string, status: 'active' | 'paused' | 'filled') {
  const supabase = await createClient();
  const { error } = await supabase
    .from('lanes')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', laneId);

  if (error) throw new Error(error.message);
  revalidatePath('/lanes');
}