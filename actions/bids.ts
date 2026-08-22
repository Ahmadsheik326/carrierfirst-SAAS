
'use server';

import { createClient } from '@/lib/supabase/server';
import type { Bid } from '@/types';
import { revalidatePath } from 'next/cache';

// Helper to get admin client (bypasses RLS)
function getAdminClient() {
  const { createClient: createServiceClient } = require('@supabase/supabase-js');
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function getBids(): Promise<Bid[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bids')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getBidsForLoad(loadId: string): Promise<Bid[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bids')
    .select('*')
    .eq('load_id', loadId)
    .order('amount', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function createBid(loadId: string, amount: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // Gate: only approved carriers can bid. Pending carriers can still
  // browse the load board — they just can't commit to a load yet.
  const { data: carrierProfile } = await supabase
    .from('carriers')
    .select('status')
    .eq('user_id', user.id)
    .single();

  if (carrierProfile?.status === 'pending') {
    throw new Error('Your carrier account is pending approval. You can browse loads, but bidding is disabled until a broker reviews your profile.');
  }
  if (carrierProfile?.status === 'suspended') {
    throw new Error('Your carrier account has been suspended. Contact support for details.');
  }
  
  // PROFESSIONAL: Check if load is already booked — reject bid
  const { data: load } = await supabase
    .from('loads')
    .select('status')
    .eq('id', loadId)
    .single();

  if (load?.status === 'booked' || load?.status === 'approved' || load?.status === 'delivered') {
    throw new Error('This load is no longer accepting bids');
  }

  // Check if carrier already bid on this load — update instead of duplicate
  const { data: existing } = await supabase
    .from('bids')
    .select('id')
    .eq('load_id', loadId)
    .eq('carrier_id', user.id)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from('bids')
      .update({ amount, status: 'pending', created_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    revalidatePath('/load-board');
    revalidatePath('/bids');
    return data;
  }

  const { data, error } = await supabase
    .from('bids')
    .insert({
      load_id: loadId,
      carrier_id: user.id,
      amount,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath('/load-board');
  revalidatePath('/bids');
  return data;
}

export async function acceptBid(bidId: string) {
  const supabase = await createClient();
  const admin = getAdminClient();

  const { data: bid, error: bidErr } = await supabase
    .from('bids')
    .select('*')
    .eq('id', bidId)
    .single();

  if (bidErr || !bid) throw new Error('Bid not found');

// ADD: fetch the load's shipper price so we can recompute margin correctly
  const { data: load, error: loadFetchErr } = await supabase
    .from('loads')
    .select('bid_total')
    .eq('id', bid.load_id)
    .single();

  if (loadFetchErr || !load) throw new Error('Load not found');

  const { error: acceptErr } = await supabase
    .from('bids')
    .update({ status: 'accepted' })
    .eq('id', bidId);

  if (acceptErr) throw new Error(acceptErr.message);

  await supabase
    .from('bids')
    .update({ status: 'rejected' })
    .eq('load_id', bid.load_id)
    .neq('id', bidId);

  const { error: loadErr } = await admin
    .from('loads')
    .update({
      status: 'booked',
      carrier_id: bid.carrier_id,
      accepted_bid_amount: bid.amount,                     // NEW — the real settled amount
      margin: (load.bid_total || 0) - bid.amount,           // margin now uses the real accepted amount
      updated_at: new Date().toISOString(),
    })
    .eq('id', bid.load_id);

  if (loadErr) throw new Error(loadErr.message);

  revalidatePath('/bids');
  revalidatePath('/loads');
  revalidatePath('/load-board');
  revalidatePath(`/loads/${bid.load_id}`);

  return { success: true };
}

export async function rejectBid(bidId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('bids')
    .update({ status: 'rejected' })
    .eq('id', bidId);

  if (error) throw new Error(error.message);
  revalidatePath('/bids');
  revalidatePath('/load-board');
}