// // actions/quotes.ts
// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { calculateFreight } from '@/lib/utils/calculator';
// import type { QuoteRequest } from '@/types';
// import { revalidatePath } from 'next/cache';

// export async function getQuoteRequests(): Promise<QuoteRequest[]> {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from('quote_requests')
//     .select('*')
//     .order('created_at', { ascending: false });

//   if (error) throw new Error(error.message);
//   return data || [];
// }

// export async function createQuoteRequest(input: {
//   shipper_name: string;
//   origin: string;
//   destination: string;
//   equipment_type: string;
//   mileage: number;
//   weight: number;
//   stops: number;
//   tarp: boolean;
//   region_x: boolean;
//   market: string;
// }) {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) throw new Error('You must be logged in to submit a quote');

//   const calc = calculateFreight({
//     equipment: input.equipment_type,
//     origin: input.origin,
//     mileage: input.mileage,
//     weight: input.weight,
//     stops: input.stops,
//     tarp: input.tarp,
//     regionX: input.region_x,
//   });

//   const { data, error } = await supabase
//     .from('quote_requests')
//     .insert({
//       shipper_name: input.shipper_name,
//       origin: input.origin,
//       destination: input.destination,
//       equipment_type: input.equipment_type,
//       mileage: input.mileage,
//       weight: input.weight,
//       stops: input.stops,
//       tarp: input.tarp,
//       region_x: input.region_x,
//       market: input.market,
//       shipper_id: user.id,  // ← THIS FIXES THE RLS ERROR
//       estimated_total: calc.bidTotal,
//       status: 'pending',
//     })
//     .select()
//     .single();

//   if (error) throw new Error(error.message);
//   revalidatePath('/quotes');
//   return data;
// }

// export async function approveQuote(quoteId: string) {
//   const supabase = await createClient();

//   const { data: quote } = await supabase
//     .from('quote_requests')
//     .select('*')
//     .eq('id', quoteId)
//     .single();

//   if (!quote) throw new Error('Quote not found');

//   await supabase.from('quote_requests').update({ status: 'approved' }).eq('id', quoteId);

//   const { count } = await supabase.from('loads').select('*', { count: 'exact', head: true });
//   const loadId = `LD-${String((count || 0) + 1).padStart(3, '0')}`;

//   const { data: { user } } = await supabase.auth.getUser();

//   await supabase.from('loads').insert({
//     load_id: loadId,
//     shipper_name: quote.shipper_name,
//     shipper_id: quote.shipper_id,  // ← PRESERVE THE ORIGINAL SHIPPER
//     origin: quote.origin,
//     destination: quote.destination,
//     equipment_type: quote.equipment_type,
//     mileage: quote.mileage,
//     weight: quote.weight,
//     stops: quote.stops,
//     tarp: quote.tarp,
//     region_x: quote.region_x,
//     status: 'bidding',
//     bid_total: quote.estimated_total,
//     margin: (quote.estimated_total || 0) * 0.15,
//     broker_id: user?.id,
//   });

//   revalidatePath('/quotes');
//   revalidatePath('/loads');
// }

// export async function rejectQuote(quoteId: string) {
//   const supabase = await createClient();
//   const { error } = await supabase
//     .from('quote_requests')
//     .update({ status: 'rejected' })
//     .eq('id', quoteId);

//   if (error) throw new Error(error.message);
//   revalidatePath('/quotes');
// }
// export async function deleteQuote(quoteId: string) {
//   const supabase = await createClient();
//   const { error } = await supabase
//     .from('quote_requests')
//     .delete()
//     .eq('id', quoteId);

//   if (error) throw new Error(error.message);
//   revalidatePath('/quotes');
// }
'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getQuoteRequests() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getQuoteRequests error:', error);
    return [];
  }
  return data || [];
}

export async function getQuoteRequestById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createQuoteRequest(formData: {
  origin: string;
  destination: string;
  equipment_type: string;
  mileage: number;
  weight: number;
  stops?: number;
  tarp?: boolean;
  region_x?: boolean;
  market?: string;
  est_total?: number;
  estimated_rate?: number;
  estimated_total?: number;
  shipper_name?: string;
  contact_name?: string;
  contact_phone?: string;
  notes?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('You must be logged in to submit a quote');

  const { data: profile } = await supabase
    .from('users')
    .select('full_name, company_name, email, phone')
    .eq('id', user.id)
    .single();

  const calculatedTotal = 
    formData.est_total || 
    formData.estimated_total || 
    formData.estimated_rate || 
    0;

  const { data, error } = await supabase
    .from('quote_requests')
    .insert({
      origin: formData.origin,
      destination: formData.destination,
      equipment_type: formData.equipment_type,
      mileage: formData.mileage,
      weight: formData.weight,
      stops: formData.stops || 0,
      tarp: formData.tarp || false,
      region_x: formData.region_x,
      market: formData.market || 'General',
      est_total: calculatedTotal,
      shipper_id: user.id,
      shipper_name: formData.shipper_name || profile?.full_name || profile?.email || 'Unknown',
      contact_name: formData.contact_name || profile?.full_name,
      contact_phone: formData.contact_phone || profile?.phone,
      notes: formData.notes,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('createQuoteRequest error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/quotes');
  return data;
}

export async function deleteQuote(quoteId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('quote_requests')
    .delete()
    .eq('id', quoteId);

  if (error) throw new Error(error.message);

  revalidatePath('/quotes');
  return { success: true };
}

export async function rejectQuote(quoteId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('quote_requests')
    .update({ status: 'rejected', updated_at: new Date().toISOString() })
    .eq('id', quoteId);

  if (error) throw new Error(error.message);

  revalidatePath('/quotes');
  return { success: true };
}

export async function approveQuote(quoteId: string) {
  const supabase = await createClient();

  const { data: quote, error: quoteErr } = await supabase
    .from('quote_requests')
    .select('*')
    .eq('id', quoteId)
    .single();

  if (quoteErr || !quote) throw new Error('Quote not found');

  const { data: existingLoads } = await supabaseAdmin
    .from('loads')
    .select('load_id');

  let maxNum = 0;
  existingLoads?.forEach((l: any) => {
    const match = l.load_id?.match(/LD-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  });

  const loadNumber = maxNum + 1;
  const loadId = `LD-${String(loadNumber).padStart(3, '0')}`;

  const { data: load, error: loadErr } = await supabaseAdmin
    .from('loads')
    .insert({
      load_id: loadId,
      origin: quote.origin,
      destination: quote.destination,
      equipment_type: quote.equipment_type,
      mileage: quote.mileage || 0,
      weight: quote.weight,
      status: 'bidding',
      shipper_id: quote.shipper_id,
      shipper_name: quote.shipper_name || quote.contact_name || 'Unknown',
      est_total: quote.est_total || 0,
      bid_total: quote.est_total || 0,
      margin: (quote.est_total || 0) * 0.15,
      broker_id: (await supabase.auth.getUser()).data.user?.id ?? null,
      stops: quote.stops || 0,
      tarp: quote.tarp || false,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (loadErr) {
    console.error('Load creation error:', loadErr);
    throw new Error(`Failed to create load: ${loadErr.message}`);
  }

  const { error: quoteUpdateErr } = await supabase
    .from('quote_requests')
    .update({
      status: 'approved',
      load_id: load.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', quoteId);

  if (quoteUpdateErr) {
    console.error('Failed to mark quote as approved:', quoteUpdateErr);
    throw new Error(`Load was created, but failed to update quote status: ${quoteUpdateErr.message}`);
  }

  revalidatePath('/quotes');
  revalidatePath('/load-board');
  revalidatePath('/loads');

  return { success: true, load };
}