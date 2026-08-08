// actions/pricing.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import type { PricingMatrixEntry } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getPricingMatrix(): Promise<PricingMatrixEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pricing_matrix')
    .select('*');

  if (error) throw new Error(error.message);
  return data || [];
}

export async function updateRPM(id: string, rpm: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('pricing_matrix')
    .update({ rpm })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/pricing');
}

export async function getPricingMatrixAsRecord(): Promise<Record<string, Record<string, number>>> {
  const entries = await getPricingMatrix();
  const matrix: Record<string, Record<string, number>> = {};

  entries.forEach((entry) => {
    if (!matrix[entry.equipment_type]) matrix[entry.equipment_type] = {};
    matrix[entry.equipment_type][entry.market] = entry.rpm;
  });

  return matrix;
}
