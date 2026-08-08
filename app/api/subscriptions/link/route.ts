// app/api/subscriptions/link/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { paypal_subscription_id } = await request.json();

  if (!paypal_subscription_id) {
    return NextResponse.json({ error: 'Missing subscription ID' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // no-op: this route doesn't need to mutate the response cookies
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Upsert as pending — the webhook is what confirms and activates this.
  // If the webhook already beat us here (rare, but possible), don't
  // downgrade an already-active status back to pending.
  const { data: existing } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .maybeSingle();

  const nextStatus = existing?.status === 'active' ? 'active' : 'pending';

  const { error } = await supabase.from('subscriptions').upsert(
    {
      user_id: user.id,
      paypal_subscription_id,
      status: nextStatus,
      plan: 'monthly',
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}