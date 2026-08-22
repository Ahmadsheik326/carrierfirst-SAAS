// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { createClient as createServiceClient } from '@supabase/supabase-js';
// import { revalidatePath } from 'next/cache';

// const supabaseAdmin = createServiceClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function getShippers() {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from('shippers')
//     .select('*')
//     .order('created_at', { ascending: false });

//   if (error) {
//     console.error('getShippers error:', error);
//     return [];
//   }
//   return data || [];
// }

// export async function getShipperById(id: string) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from('shippers')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error) throw new Error(error.message);
//   return data;
// }

// export interface ShipperFormInput {
//   company_name: string;
//   credit_limit?: number;
//   credit_balance?: number;
//   payment_terms?: string;
// }

// export async function createShipper(input: ShipperFormInput) {
//   if (!input.company_name?.trim()) {
//     throw new Error('Company name is required');
//   }

//   const { data, error } = await supabaseAdmin
//     .from('shippers')
//     .insert({
//       company_name: input.company_name,
//       credit_limit: input.credit_limit || 0,
//       credit_balance: input.credit_balance || 0,
//       payment_terms: input.payment_terms || 'Net 30',
//       status: 'pending',
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .select()
//     .single();

//   if (error) {
//     console.error('createShipper error:', error);
//     throw new Error(error.message);
//   }

//   revalidatePath('/shippers');
//   return data;
// }

// export async function updateShipper(id: string, input: ShipperFormInput) {
//   if (!input.company_name?.trim()) {
//     throw new Error('Company name is required');
//   }

//   const { data, error } = await supabaseAdmin
//     .from('shippers')
//     .update({
//       company_name: input.company_name,
//       credit_limit: input.credit_limit || 0,
//       credit_balance: input.credit_balance || 0,
//       payment_terms: input.payment_terms || 'Net 30',
//       updated_at: new Date().toISOString(),
//     })
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error('updateShipper error:', error);
//     throw new Error(error.message);
//   }

//   revalidatePath('/shippers');
//   return data;
// }

// export async function updateShipperStatus(id: string, status: 'pending' | 'active' | 'suspended') {
//   const { data, error } = await supabaseAdmin
//     .from('shippers')
//     .update({ status, updated_at: new Date().toISOString() })
//     .eq('id', id)
//     .select();

//   if (error) {
//     console.error('updateShipperStatus error:', error);
//     throw new Error(error.message);
//   }
//   if (!data || data.length === 0) {
//     throw new Error('Shipper not found or update did not apply');
//   }

//   revalidatePath('/shippers');
//   return { success: true };
// }

// export async function deleteShipper(id: string) {
//   const { error } = await supabaseAdmin
//     .from('shippers')
//     .delete()
//     .eq('id', id);

//   if (error) {
//     console.error('deleteShipper error:', error);
//     throw new Error(error.message);
//   }

//   revalidatePath('/shippers');
//   return { success: true };
// }
'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getShippers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('shippers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getShippers error:', error);
    return [];
  }

  const shippers = data || [];

  const userIds = [...new Set(shippers.map((s: any) => s.user_id).filter(Boolean))] as string[];

  if (userIds.length > 0) {
    const { data: users } = await supabaseAdmin
      .from('users')
      .select('id, full_name, email')
      .in('id', userIds);

    const userMap = new Map((users || []).map((u: any) => [u.id, u]));

    return shippers.map((s: any) => {
      const u = s.user_id ? userMap.get(s.user_id) : null;
      return {
        ...s,
        display_name: s.company_name && !s.company_name.startsWith('Shipper ')
          ? s.company_name
          : (u?.full_name || u?.email || s.company_name || 'Unnamed shipper'),
        signup_email: u?.email || null,
      };
    });
  }

  return shippers.map((s: any) => ({
    ...s,
    display_name: s.company_name || 'Unnamed shipper',
    signup_email: null,
  }));
}

export async function getShipperById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('shippers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export interface ShipperFormInput {
  company_name: string;
  credit_limit?: number;
  credit_balance?: number;
  payment_terms?: string;
}

export async function createShipper(input: ShipperFormInput) {
  if (!input.company_name?.trim()) {
    throw new Error('Company name is required');
  }

  const { data, error } = await supabaseAdmin
    .from('shippers')
    .insert({
      company_name: input.company_name,
      credit_limit: input.credit_limit || 0,
      credit_balance: input.credit_balance || 0,
      payment_terms: input.payment_terms || 'Net 30',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('createShipper error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/shippers');
  return data;
}

export async function updateShipper(id: string, input: ShipperFormInput) {
  if (!input.company_name?.trim()) {
    throw new Error('Company name is required');
  }

  const { data, error } = await supabaseAdmin
    .from('shippers')
    .update({
      company_name: input.company_name,
      credit_limit: input.credit_limit || 0,
      credit_balance: input.credit_balance || 0,
      payment_terms: input.payment_terms || 'Net 30',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateShipper error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/shippers');
  return data;
}

export async function updateShipperStatus(id: string, status: 'pending' | 'active' | 'suspended') {
  const { data, error } = await supabaseAdmin
    .from('shippers')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) {
    console.error('updateShipperStatus error:', error);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    throw new Error('Shipper not found or update did not apply');
  }

  revalidatePath('/shippers');
  return { success: true };
}

export async function deleteShipper(id: string) {
  const { error } = await supabaseAdmin
    .from('shippers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteShipper error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/shippers');
  return { success: true };
}