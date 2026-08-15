
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@/lib/supabase/client';

// // Your PayPal monthly plan — created earlier in the PayPal dashboard.
// const PAYPAL_PLAN_ID = 'P-8XV342311D390982LNJYOX6I';

// declare global {
//   interface Window {
//     paypal?: any;
//   }
// }

// export default function SubscribePage() {
//   const router = useRouter();
//   const buttonContainerRef = useRef<HTMLDivElement>(null);
//   const currentUserId = useRef<string | null>(null);
//   const [status, setStatus] = useState<'loading' | 'ready' | 'processing' | 'error'>('loading');
//   const [errorMsg, setErrorMsg] = useState('');

//   useEffect(() => {
//     const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

//     if (!clientId) {
//       setStatus('error');
//       setErrorMsg('PayPal is not configured. Contact support.');
//       return;
//     }

//     const scriptId = 'paypal-sdk';
//     const existing = document.getElementById(scriptId);

//     async function renderButtons() {
//       if (!window.paypal || !buttonContainerRef.current) return;

//       // Grab the current user's ID up front so it's available synchronously
//       // inside createSubscription (which can't be async-awaited the same way).
//       // This gets attached to the PayPal subscription as custom_id, so the
//       // webhook can identify the user even if the /api/subscriptions/link
//       // call below fails or the page closes before it finishes.
//       const supabase = createClient();
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) {
//         router.push('/login');
//         return;
//       }

//       currentUserId.current = user.id;

//       buttonContainerRef.current.innerHTML = '';

//       window.paypal
//         .Buttons({
//           style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
//           createSubscription: function (_data: any, actions: any) {
//             return actions.subscription.create({
//               plan_id: PAYPAL_PLAN_ID,
//               custom_id: currentUserId.current ?? undefined,
//             });
//           },
//           onApprove: async function (data: any) {
//             setStatus('processing');
//             try {
//               // Record the subscription as pending immediately. This is a
//               // best-effort convenience call — the webhook is the real
//               // source of truth and can self-heal using custom_id even if
//               // this call fails entirely, so we don't treat its failure as
//               // fatal to the user's experience.
//               await fetch('/api/subscriptions/link', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ paypal_subscription_id: data.subscriptionID }),
//               }).catch(() => {
//                 // Swallowed intentionally — webhook will still activate
//                 // the account via custom_id even if this never lands.
//               });

//               // Give the webhook a moment to land, then send them in —
//               // middleware will bounce them back here if it hasn't landed yet.
//               setTimeout(() => {
//                 router.push('/dashboard');
//                 router.refresh();
//               }, 2500);
//             } catch (err) {
//               setStatus('error');
//               setErrorMsg('Something went wrong confirming your subscription. If you were charged, contact support.');
//             }
//           },
//           onError: function () {
//             setStatus('error');
//             setErrorMsg('PayPal encountered an error. Please try again.');
//           },
//         })
//         .render(buttonContainerRef.current);

//       setStatus('ready');
//     }

//     if (existing) {
//       renderButtons();
//       return;
//     }

//     const script = document.createElement('script');
//     script.id = scriptId;
//     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
//     script.onload = renderButtons;
//     script.onerror = () => {
//       setStatus('error');
//       setErrorMsg('Could not load PayPal. Check your connection and try again.');
//     };
//     document.body.appendChild(script);
//   }, [router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Activate Your Account</h1>
//         <p className="text-gray-500 mb-6">
//           $15/month gets you full access to the broker portal — loads, bids, carriers, invoicing, and more.
//         </p>

//         {status === 'processing' && (
//           <p className="text-sm text-gray-600 mb-4">Confirming your subscription…</p>
//         )}

//         {status === 'error' && (
//           <p className="text-sm text-red-600 mb-4">{errorMsg}</p>
//         )}

//         <div ref={buttonContainerRef} />

//         {status === 'loading' && (
//           <p className="text-sm text-gray-400 mt-4">Loading payment options…</p>
//         )}
//       </div>
//     </div>
//   );
// }
// app/subscribe/page.tsx
// app/subscribe/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
      Redirecting...
    </div>
  );
}