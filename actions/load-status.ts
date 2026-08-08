// // actions/load-status.ts
// 'use server';

// import { createClient } from '@/lib/supabase/server';
// import { revalidatePath } from 'next/cache';

// // Only forward transitions are allowed — no skipping straight to delivered,
// // no moving backward. Keeps the status field trustworthy for the invoice
// // trigger, which only fires on the transition INTO 'delivered'.
// const ALLOWED_TRANSITIONS: Record<string, string[]> = {
//   booked: ['in_transit'],
//   in_transit: ['delivered'],
// };

// export async function updateLoadStatus(loadId: string, newStatus: string) {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) throw new Error('Not authenticated');

//   const { data: load, error: loadErr } = await supabase
//     .from('loads')
//     .select('id, status, carrier_id, broker_id')
//     .eq('id', loadId)
//     .single();

//   if (loadErr || !load) throw new Error('Load not found');

//   const { data: profile } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', user.id)
//     .single();

//   const isBroker = ['broker_admin', 'broker_staff', 'super_admin'].includes(profile?.role ?? '');
//   const isAssignedCarrier = load.carrier_id === user.id;

//   if (!isBroker && !isAssignedCarrier) {
//     throw new Error('You are not authorized to update this load.');
//   }

//   // Brokers can move a load into any forward state directly (override).
//   // Carriers must follow the defined step order.
//   if (!isBroker) {
//     const allowedNext = ALLOWED_TRANSITIONS[load.status] ?? [];
//     if (!allowedNext.includes(newStatus)) {
//       throw new Error(`Cannot move a "${load.status}" load directly to "${newStatus}".`);
//     }
//   }

//   const { error: updateErr } = await supabase
//     .from('loads')
//     .update({ status: newStatus, updated_at: new Date().toISOString() })
//     .eq('id', loadId);

//   if (updateErr) throw new Error(updateErr.message);

//   // This is the moment the invoice trigger fires automatically when
//   // newStatus === 'delivered' — nothing else needs to happen here for that.

//   revalidatePath('/loads');
//   revalidatePath('/load-board');
//   revalidatePath('/invoices');

//   return { success: true };
// }
// actions/load-status.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Only forward transitions are allowed — no skipping straight to delivered,
// no moving backward. Keeps the status field trustworthy for the invoice
// trigger, which only fires on the transition INTO 'delivered'.
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  booked: ['picked_up'],
  picked_up: ['in_transit'],
  in_transit: ['delivered'],
};

export async function updateLoadStatus(loadId: string, newStatus: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: load, error: loadErr } = await supabase
    .from('loads')
    .select('id, status, carrier_id, broker_id')
    .eq('id', loadId)
    .single();

  if (loadErr || !load) throw new Error('Load not found');

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  const isBroker = ['broker_admin', 'broker_staff', 'super_admin'].includes(profile?.role ?? '');
  const isAssignedCarrier = load.carrier_id === user.id;

  if (!isBroker && !isAssignedCarrier) {
    throw new Error('You are not authorized to update this load.');
  }

  // Brokers can move a load into any forward state directly (override).
  // Carriers must follow the defined step order.
  if (!isBroker) {
    const allowedNext = ALLOWED_TRANSITIONS[load.status] ?? [];
    if (!allowedNext.includes(newStatus)) {
      throw new Error(`Cannot move a "${load.status}" load directly to "${newStatus}".`);
    }
  }

  const { error: updateErr } = await supabase
    .from('loads')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', loadId);

  if (updateErr) throw new Error(updateErr.message);

  // This is the moment the invoice trigger fires automatically when
  // newStatus === 'delivered' — nothing else needs to happen here for that.

  revalidatePath('/loads');
  revalidatePath('/load-board');
  revalidatePath('/invoices');

  return { success: true };
}