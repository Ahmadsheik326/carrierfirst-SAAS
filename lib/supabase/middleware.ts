
// // lib/supabase/middleware.ts//

//   import { createServerClient, type CookieOptions } from '@supabase/ssr';
//   import { NextResponse, type NextRequest } from 'next/server';

//   export async function updateSession(request: NextRequest) {
//     const pathname = request.nextUrl.pathname;

//     // PayPal calls this route directly — it is not a logged-in user and must
//     // never be redirected to /login or /subscribe, or webhooks silently break.
//     if (pathname.startsWith('/api/webhooks/')) {
//       return NextResponse.next({ request });
//     }

//     let supabaseResponse = NextResponse.next({ request });

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
//             cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
//             supabaseResponse = NextResponse.next({ request });
//             cookiesToSet.forEach(({ name, value, options }) =>
//               supabaseResponse.cookies.set(name, value, options)
//             );
//           },
//         },
//       }
//     );

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     // Not logged in at all — send to login, same as before.
//     if (!user && !pathname.startsWith('/login') && pathname !== '/') {
//       const url = request.nextUrl.clone();
//       url.pathname = '/login';
//       return NextResponse.redirect(url);
//     }

//    // TEMP: paywall disabled for workflow testing. Set back to true before launch.
//     const PAYWALL_ENABLED = false;

//     // Logged in — check billing status, but only for shipper/carrier roles.
//     // Brokers (broker_admin, broker_staff, super_admin) are exempt for now.
//     if (user && !pathname.startsWith('/login') && !pathname.startsWith('/subscribe')) {
//       const { data: profile } = await supabase
//         .from('users')
//         .select('role, is_active')
//         .eq('id', user.id)
//         .single();

//       const payingRoles = ['shipper', 'carrier'];

//       if (PAYWALL_ENABLED && profile && payingRoles.includes(profile.role) && profile.is_active !== true) {
//         const url = request.nextUrl.clone();
//         url.pathname = '/subscribe';
//         return NextResponse.redirect(url);
//       }
//     }

//     return supabaseResponse;
//   }
// lib/supabase/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in — send to login (except login page itself)
  if (!user && !pathname.startsWith('/login') && pathname !== '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // No paywall. No subscription checks. Everyone goes through.
  return supabaseResponse;
}