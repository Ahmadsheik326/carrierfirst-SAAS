'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import type { CalculationResult, LoadInput } from '@/types';

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function saveQuote(input: LoadInput, result: CalculationResult, notes?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('You must be logged in to save a quote');

  // Writes go through the admin client — same pattern as approveQuote/rejectQuote,
  // avoids the RLS-blocked-silently issue we already hit on quote_requests.
  const { data, error } = await supabaseAdmin
    .from('saved_quotes')
    .insert({
      broker_id: user.id,
      equipment_type: input.equipment,
      market: input.origin, // NOTE: LoadInput calls this "origin" but it's actually the market dropdown value
      mileage: input.mileage,
      weight: input.weight,
      stops: input.stops,
      tarp: input.tarp,
      region_x: input.regionX,
      base_rpm: result.baseRPM,
      weight_adj_rpm: result.weightAdjRPM,
      effective_rpm: result.effectiveRPM,
      linehaul: result.linehaul,
      stop_fee: result.stopFee,
      tarp_fee: result.tarpFee,
      region_x_fee: result.regionXFee,
      short_mile: result.shortMile,
      service_charges: result.serviceCharges,
      bid_total: result.bidTotal,
      margin: result.margin,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    console.error('saveQuote error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/saved-quotes');
  return data;
}

export async function getSavedQuotes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('saved_quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getSavedQuotes error:', error);
    return [];
  }
  return data || [];
}

export async function deleteSavedQuote(id: string) {
  const { error } = await supabaseAdmin
    .from('saved_quotes')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/saved-quotes');
  return { success: true };
}

// convertToQuoteRequest() comes in step 4, once we've decided how the
// broker picks a shipper from the `shippers` table at conversion time.