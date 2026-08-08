// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// // ... your existing getLoads and other functions ...

// export async function deleteLoad(loadId: string) {
//   const supabase = await createClient();
  
//   // Debug: get user
//   const { data: { user } } = await supabase.auth.getUser();
//   console.log('DEBUG - User from auth:', user?.id, user?.email);
  
//   if (!user) return { error: 'Not authenticated — no user session in server action' };

//   // Debug: get role
//   const { data: userData, error: userError } = await supabase
//     .from('users')
//     .select('role, full_name, email')
//     .eq('id', user.id)
//     .single();
    
//   console.log('DEBUG - UserData from DB:', userData);
//   console.log('DEBUG - UserError:', userError);

//   if (!userData) {
//     return { error: `No user record found in 'users' table for ID: ${user.id}` };
//   }

//   const allowedRoles = ['admin', 'broker_admin', 'super_admin'];
//   if (!allowedRoles.includes(userData.role)) {
//     return { error: `Your role is '${userData.role}'. Only ${allowedRoles.join('/')} can delete.` };
//   }

//   // Delete related bids first
//   await supabase.from('bids').delete().eq('load_id', loadId);
//   await supabase.from('quote_requests').delete().eq('load_id', loadId);
  
//   // Delete the load
//   const { error } = await supabase.from('loads').delete().eq('id', loadId);
  
//   if (error) return { error: error.message };
  
//   revalidatePath('/loads');
//   revalidatePath('/load-board');
  
//   return { success: true };
// }
// export async function getLoads() {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from('loads')
//     .select('*')
//     .order('created_at', { ascending: false });
    
//   if (error) throw error;
//   return data || [];
// }
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// ======================
// GET LOADS (your original function — restored)
// ======================
export async function getLoads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('loads')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('getLoads error:', error);
    return [];
  }
  return data || [];
}

// ======================
// DELETE LOAD (new — with service role)
// ======================
export async function deleteLoad(loadId: string) {
  const supabase = await createClient();
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };
  
  // Check role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
    
  const allowedRoles = ['admin', 'broker', 'broker_admin', 'super_admin'];
  if (!userData || !allowedRoles.includes(userData.role)) {
    return { error: 'Unauthorized' };
  }

  // Use service role to bypass RLS
  const { createClient: createServiceClient } = require('@supabase/supabase-js');
  const supabaseAdmin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Delete related records
  await supabaseAdmin.from('bids').delete().eq('load_id', loadId);
  await supabaseAdmin.from('quote_requests').delete().eq('load_id', loadId);
  
  // Delete load
  const { data, error } = await supabaseAdmin
    .from('loads')
    .delete()
    .eq('id', loadId)
    .select();

  if (error) return { error: error.message };
  if (!data || data.length === 0) return { error: 'Load not found' };

  revalidatePath('/loads');
  revalidatePath('/load-board');
  
  return { success: true };
}