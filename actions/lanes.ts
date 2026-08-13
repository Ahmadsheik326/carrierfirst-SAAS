// actions/lanes.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getLanes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lanes')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getLanes error:', error);
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
    .select('*, lane_interests(count)')
    .eq('posted_by', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getMyLanes error:', error);
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

  const { error } = await supabase.from('lanes').insert({
    posted_by: user.id,
    origin: input.origin,
    destination: input.destination,
    equipment_type: input.equipment_type,
    target_rate: input.target_rate,
    notes: input.notes || null,
  });

  if (error) throw new Error(error.message);
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