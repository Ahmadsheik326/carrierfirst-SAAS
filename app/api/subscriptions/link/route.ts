// // app/subscribe/page.tsx
// import { redirect } from "next/navigation";

// export default function SubscribePage() {
//   redirect("/");
// }
// app/api/subscriptions/link/route.ts
//
// PayPal subscription linking — temporarily paused.
// This was previously a misplaced page component sitting at this API
// route path, which broke the production build (Next.js requires
// route.ts files to export HTTP method handlers, not a page component).
//
// The real page component now lives at app/subscribe/page.tsx.
//
// TODO: replace this stub with the real PayPal subscription-link
// handler when PayPal billing is re-enabled.

export async function GET() {
  return new Response(
    JSON.stringify({ error: 'PayPal subscriptions are temporarily unavailable.' }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ error: 'PayPal subscriptions are temporarily unavailable.' }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}