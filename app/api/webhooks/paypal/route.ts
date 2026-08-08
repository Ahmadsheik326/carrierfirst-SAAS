// // app/api/webhooks/paypal/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// // Use the SERVICE ROLE key here, not the anon key. PayPal is calling this
// // route with no logged-in user session, so normal RLS policies (which key
// // off auth.uid()) would block every update. The service role bypasses RLS —
// // this route is the only place that should ever use it, and it only runs
// // after the signature below is verified as genuinely from PayPal.
// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// // Sandbox while testing; switch to https://api-m.paypal.com when you go live.
// const PAYPAL_API_BASE =
//   process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';

// async function getPayPalAccessToken(): Promise<string> {
//   const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
//   const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
//   const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

//   const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${auth}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: 'grant_type=client_credentials',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to obtain PayPal access token');
//   }

//   const data = await res.json();
//   return data.access_token;
// }

// async function verifyWebhookSignature(
//   headers: Headers,
//   webhookEvent: any
// ): Promise<boolean> {
//   const accessToken = await getPayPalAccessToken();

//   const verificationPayload = {
//     auth_algo: headers.get('paypal-auth-algo'),
//     cert_url: headers.get('paypal-cert-url'),
//     transmission_id: headers.get('paypal-transmission-id'),
//     transmission_sig: headers.get('paypal-transmission-sig'),
//     transmission_time: headers.get('paypal-transmission-time'),
//     webhook_id: process.env.PAYPAL_WEBHOOK_ID,
//     webhook_event: webhookEvent,
//   };

//   const res = await fetch(
//     `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(verificationPayload),
//     }
//   );

//   if (!res.ok) return false;

//   const result = await res.json();
//   return result.verification_status === 'SUCCESS';
// }

// export async function POST(request: NextRequest) {
//   let webhookEvent: any;

//   try {
//     webhookEvent = await request.json();
//   } catch {
//     return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
//   }

//   // Reject anything that isn't genuinely signed by PayPal. This is the step
//   // that stops someone from POSTing a fake "subscription activated" event
//   // to grant themselves free access.
//   let verified = false;
//   try {
//     verified = await verifyWebhookSignature(request.headers, webhookEvent);
//   } catch (err) {
//     console.error('PayPal signature verification failed:', err);
//     return NextResponse.json({ error: 'Verification error' }, { status: 500 });
//   }

//   if (!verified) {
//     console.warn('Rejected unverified PayPal webhook event');
//     return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
//   }

//   const eventType: string = webhookEvent.event_type;
//   const resource = webhookEvent.resource;

//   try {
//     switch (eventType) {
//       case 'BILLING.SUBSCRIPTION.ACTIVATED': {
//         const paypalSubId = resource.id;
//         const nextBilling = resource?.billing_info?.next_billing_time ?? null;

//         const { data: sub } = await supabaseAdmin
//           .from('subscriptions')
//           .update({
//             status: 'active',
//             current_period_end: nextBilling,
//             updated_at: new Date().toISOString(),
//           })
//           .eq('paypal_subscription_id', paypalSubId)
//           .select('user_id')
//           .single();

//         if (sub?.user_id) {
//           await supabaseAdmin
//             .from('users')
//             .update({ is_active: true })
//             .eq('id', sub.user_id);
//         }
//         break;
//       }

//       case 'BILLING.SUBSCRIPTION.CANCELLED':
//       case 'BILLING.SUBSCRIPTION.SUSPENDED':
//       case 'BILLING.SUBSCRIPTION.EXPIRED': {
//         const paypalSubId = resource.id;
//         const statusMap: Record<string, string> = {
//           'BILLING.SUBSCRIPTION.CANCELLED': 'cancelled',
//           'BILLING.SUBSCRIPTION.SUSPENDED': 'suspended',
//           'BILLING.SUBSCRIPTION.EXPIRED': 'expired',
//         };

//         const { data: sub } = await supabaseAdmin
//           .from('subscriptions')
//           .update({
//             status: statusMap[eventType],
//             updated_at: new Date().toISOString(),
//           })
//           .eq('paypal_subscription_id', paypalSubId)
//           .select('user_id')
//           .single();

//         if (sub?.user_id) {
//           await supabaseAdmin
//             .from('users')
//             .update({ is_active: false })
//             .eq('id', sub.user_id);
//         }
//         break;
//       }

//       case 'PAYMENT.SALE.COMPLETED': {
//         // Renewal payment succeeded — extend the period, keep access active.
//         // billing_agreement_id is PayPal's field name for the subscription
//         // ID on sale/payment events.
//         const paypalSubId = resource.billing_agreement_id;
//         if (paypalSubId) {
//           const { data: sub } = await supabaseAdmin
//             .from('subscriptions')
//             .update({
//               status: 'active',
//               updated_at: new Date().toISOString(),
//             })
//             .eq('paypal_subscription_id', paypalSubId)
//             .select('user_id')
//             .single();

//           if (sub?.user_id) {
//             await supabaseAdmin
//               .from('users')
//               .update({ is_active: true })
//               .eq('id', sub.user_id);
//           }
//         }
//         break;
//       }

//       default:
//         // Unhandled event types are fine to ignore — just acknowledge receipt.
//         break;
//     }
//   } catch (err) {
//     console.error('Error processing PayPal webhook event:', err);
//     return NextResponse.json({ error: 'Processing error' }, { status: 500 });
//   }

//   return NextResponse.json({ received: true });
// }
// app/api/webhooks/paypal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the SERVICE ROLE key here, not the anon key. PayPal is calling this
// route with no logged-in user session, so normal RLS policies (which key
// off auth.uid()) would block every update. The service role bypasses RLS —
// this route is the only place that should ever use it, and it only runs
// after the signature below is verified as genuinely from PayPal.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Sandbox while testing; switch to https://api-m.paypal.com when you go live.
const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken(): Promise<string> {
  // Reuses the same client ID exposed to the browser for the subscribe
  // button — it's not a secret, just a public identifier, so it's safe
  // to read here too. Only PAYPAL_CLIENT_SECRET needs to stay server-only.
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    throw new Error('Failed to obtain PayPal access token');
  }

  const data = await res.json();
  return data.access_token;
}

async function verifyWebhookSignature(
  headers: Headers,
  webhookEvent: any
): Promise<boolean> {
  const accessToken = await getPayPalAccessToken();

  const verificationPayload = {
    auth_algo: headers.get('paypal-auth-algo'),
    cert_url: headers.get('paypal-cert-url'),
    transmission_id: headers.get('paypal-transmission-id'),
    transmission_sig: headers.get('paypal-transmission-sig'),
    transmission_time: headers.get('paypal-transmission-time'),
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: webhookEvent,
  };

  const res = await fetch(
    `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verificationPayload),
    }
  );

  if (!res.ok) return false;

  const result = await res.json();
  return result.verification_status === 'SUCCESS';
}

export async function POST(request: NextRequest) {
  let webhookEvent: any;

  try {
    webhookEvent = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Reject anything that isn't genuinely signed by PayPal. This is the step
  // that stops someone from POSTing a fake "subscription activated" event
  // to grant themselves free access.
  let verified = false;
  try {
    verified = await verifyWebhookSignature(request.headers, webhookEvent);
  } catch (err) {
    console.error('PayPal signature verification failed:', err);
    return NextResponse.json({ error: 'Verification error' }, { status: 500 });
  }

  if (!verified) {
    console.warn('Rejected unverified PayPal webhook event');
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
  }

  const eventType: string = webhookEvent.event_type;
  const resource = webhookEvent.resource;

  try {
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        const paypalSubId = resource.id;
        const nextBilling = resource?.billing_info?.next_billing_time ?? null;
        // The Supabase user ID we attached when the subscription was created —
        // this is what lets us self-heal below if no row exists yet.
        const customUserId: string | null = resource?.custom_id ?? null;

        const { data: updatedSub } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'active',
            current_period_end: nextBilling,
            updated_at: new Date().toISOString(),
          })
          .eq('paypal_subscription_id', paypalSubId)
          .select('user_id')
          .maybeSingle();

        let activatedUserId = updatedSub?.user_id ?? null;

        // No existing row matched (e.g. the client-side /link call never
        // landed). Fall back to creating the row now, using the user ID
        // PayPal handed back to us via custom_id, so activation still works.
        if (!activatedUserId && customUserId) {
          const { data: insertedSub, error: insertErr } = await supabaseAdmin
            .from('subscriptions')
            .upsert(
              {
                user_id: customUserId,
                paypal_subscription_id: paypalSubId,
                status: 'active',
                plan: 'monthly',
                current_period_end: nextBilling,
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'user_id' }
            )
            .select('user_id')
            .single();

          if (insertErr) {
            console.error('Failed to self-heal subscription row:', insertErr);
          } else {
            activatedUserId = insertedSub?.user_id ?? null;
          }
        }

        if (activatedUserId) {
          await supabaseAdmin
            .from('users')
            .update({ is_active: true })
            .eq('id', activatedUserId);
        } else {
          console.error(
            'BILLING.SUBSCRIPTION.ACTIVATED received but no user could be identified',
            { paypalSubId, customUserId }
          );
        }
        break;
      }

      case 'BILLING.SUBSCRIPTION.CANCELLED':
      case 'BILLING.SUBSCRIPTION.SUSPENDED':
      case 'BILLING.SUBSCRIPTION.EXPIRED': {
        const paypalSubId = resource.id;
        const statusMap: Record<string, string> = {
          'BILLING.SUBSCRIPTION.CANCELLED': 'cancelled',
          'BILLING.SUBSCRIPTION.SUSPENDED': 'suspended',
          'BILLING.SUBSCRIPTION.EXPIRED': 'expired',
        };

        const { data: sub } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: statusMap[eventType],
            updated_at: new Date().toISOString(),
          })
          .eq('paypal_subscription_id', paypalSubId)
          .select('user_id')
          .single();

        if (sub?.user_id) {
          await supabaseAdmin
            .from('users')
            .update({ is_active: false })
            .eq('id', sub.user_id);
        }
        break;
      }

      case 'PAYMENT.SALE.COMPLETED': {
        // Renewal payment succeeded — extend the period, keep access active.
        // billing_agreement_id is PayPal's field name for the subscription
        // ID on sale/payment events.
        const paypalSubId = resource.billing_agreement_id;
        if (paypalSubId) {
          const { data: sub } = await supabaseAdmin
            .from('subscriptions')
            .update({
              status: 'active',
              updated_at: new Date().toISOString(),
            })
            .eq('paypal_subscription_id', paypalSubId)
            .select('user_id')
            .single();

          if (sub?.user_id) {
            await supabaseAdmin
              .from('users')
              .update({ is_active: true })
              .eq('id', sub.user_id);
          }
        }
        break;
      }

      default:
        // Unhandled event types are fine to ignore — just acknowledge receipt.
        break;
    }
  } catch (err) {
    console.error('Error processing PayPal webhook event:', err);
    return NextResponse.json({ error: 'Processing error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}