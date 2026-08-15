'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type NotificationType =
  | 'lane_approved'
  | 'lane_rejected'
  | 'carrier_interested'
  | 'lane_assigned'
  | 'load_status_changed';

export async function getNotifications() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(30);

  if (error) {
    console.error('getNotifications error:', error);
    return [];
  }
  return data || [];
}

export async function getUnreadCount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false);

  if (error) {
    console.error('getUnreadCount error:', error);
    return 0;
  }
  return count || 0;
}

export async function markAsRead(notificationId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw new Error(error.message);
  revalidatePath('/', 'layout');
}

export async function markAllAsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false);

  if (error) throw new Error(error.message);
  revalidatePath('/', 'layout');
}

// Internal helper — call this from other server actions (lanes.ts, loads.ts, etc.)
// to fire a notification. Not exposed directly to the client.
export async function notifyUser(input: {
  userId: string;
  type: NotificationType;
  title: string;
  body?: string;
  link?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from('notifications').insert({
    user_id: input.userId,
    type: input.type,
    title: input.title,
    body: input.body || null,
    link: input.link || null,
  });

  if (error) {
    // Don't throw — a failed notification shouldn't break the underlying
    // action (e.g. a lane approval should still succeed even if the
    // notification insert fails for some reason).
    console.error('notifyUser error:', error);
  }
}