'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getCarriers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('carriers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getCarriers error:', error);
    return [];
  }
  return data || [];
}

export async function getCarrierById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('carriers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export interface CarrierFormInput {
  company_name: string;
  mc_number?: string;
  dot_number?: string;
  insurance_status?: string;
  insurance_expiry?: string; // ISO date string, e.g. "2026-12-31"
  safety_rating?: string;
  equipment_types?: string[];
  preferred_lanes?: string[];
}

export async function createCarrier(input: CarrierFormInput) {
  if (!input.company_name?.trim()) {
    throw new Error('Company name is required');
  }

  const { data, error } = await supabaseAdmin
    .from('carriers')
    .insert({
      company_name: input.company_name,
      mc_number: input.mc_number || null,
      dot_number: input.dot_number || null,
      insurance_status: input.insurance_status || 'pending',
      insurance_expiry: input.insurance_expiry || null,
      safety_rating: input.safety_rating || null,
      equipment_types: input.equipment_types || [],
      preferred_lanes: input.preferred_lanes || [],
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('createCarrier error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/carriers');
  return data;
}

export async function updateCarrier(id: string, input: CarrierFormInput) {
  if (!input.company_name?.trim()) {
    throw new Error('Company name is required');
  }

  const { data, error } = await supabaseAdmin
    .from('carriers')
    .update({
      company_name: input.company_name,
      mc_number: input.mc_number || null,
      dot_number: input.dot_number || null,
      insurance_status: input.insurance_status || 'pending',
      insurance_expiry: input.insurance_expiry || null,
      safety_rating: input.safety_rating || null,
      equipment_types: input.equipment_types || [],
      preferred_lanes: input.preferred_lanes || [],
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateCarrier error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/carriers');
  return data;
}

export async function updateCarrierStatus(id: string, status: 'pending' | 'active' | 'suspended') {
  const { data, error } = await supabaseAdmin
    .from('carriers')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) {
    console.error('updateCarrierStatus error:', error);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    throw new Error('Carrier not found or update did not apply');
  }

  revalidatePath('/carriers');
  return { success: true };
}

export async function deleteCarrier(id: string) {
  const { error } = await supabaseAdmin
    .from('carriers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteCarrier error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/carriers');
  return { success: true };
}