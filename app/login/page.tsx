// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { createClient } from '@/lib/supabase/client';
// // import { useRouter } from 'next/navigation';

// // export default function LoginPage() {
// //   const [mounted, setMounted] = useState(false);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [mode, setMode] = useState<'login' | 'signup'>('login');
// //   const [success, setSuccess] = useState('');
// //   const router = useRouter();
// //   const supabase = createClient();

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
// //     setSuccess('');

// //     if (mode === 'signup') {
// //       const { error } = await supabase.auth.signUp({
// //         email,
// //         password,
// //         options: {
// //           emailRedirectTo: 'http://localhost:3001/login',
// //         },
// //       });
// //       if (error) {
// //         setError(error.message);
// //       } else {
// //         setSuccess('Account created! Check your email to confirm, then sign in.');
// //         setMode('login');
// //       }
// //     } else {
// //       const { error } = await supabase.auth.signInWithPassword({ email, password });
// //       if (error) {
// //         setError(error.message);
// //       } else {
// //         router.push('/');
// //         router.refresh();
// //       }
// //     }
// //     setLoading(false);
// //   };

// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md h-80 animate-pulse" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //       <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-md">
// //         <div className="text-center mb-8">
// //           <h1 className="text-2xl font-bold tracking-wider">QOLTIX</h1>
// //           <p className="text-sm text-gray-500 mt-1">Freight Portal</p>
// //         </div>

// //         <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
// //           {mode === 'login' ? 'Sign In' : 'Create Account'}
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               minLength={6}
// //               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
// //             />
// //           </div>

// //           {error && <p className="text-sm text-red-600">{error}</p>}
// //           {success && <p className="text-sm text-green-600">{success}</p>}

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
// //           >
// //             {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
// //           </button>
// //         </form>

// //         <p className="text-center text-sm text-gray-500 mt-6">
// //           {mode === 'login' ? (
// //             <>
// //               No account?{' '}
// //               <button
// //                 onClick={() => setMode('signup')}
// //                 className="text-gray-900 font-semibold underline"
// //               >
// //                 Sign up
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               Already have an account?{' '}
// //               <button
// //                 onClick={() => setMode('login')}
// //                 className="text-gray-900 font-semibold underline"
// //               >
// //                 Sign in
// //               </button>
// //             </>
// //           )}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { createClient } from '@/lib/supabase/client';
// import { useRouter } from 'next/navigation';

// type Role = 'shipper' | 'carrier' | 'broker_admin';

// const ROLES: { value: Role; label: string; blurb: string }[] = [
//   { value: 'shipper', label: 'Shipper', blurb: 'Post loads, request quotes' },
//   { value: 'carrier', label: 'Carrier', blurb: 'Bid on loads, haul freight' },
//   { value: 'broker_admin', label: 'Broker', blurb: 'Manage loads & pricing' },
// ];

// export default function LoginPage() {
//   const [mounted, setMounted] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [role, setRole] = useState<Role>('shipper');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [mode, setMode] = useState<'login' | 'signup'>('login');
//   const [success, setSuccess] = useState('');
//   const router = useRouter();
//   const supabase = createClient();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     if (mode === 'signup') {
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: 'http://localhost:3000/login',
//           data: {
//             role,
//             full_name: fullName,
//           },
//         },
//       });
//       if (error) {
//         setError(error.message);
//       } else {
//         setSuccess('Account created. Check your email to confirm, then sign in.');
//         setMode('login');
//       }
//     } else {
//       const { error } = await supabase.auth.signInWithPassword({ email, password });
//       if (error) {
//         setError(error.message);
//       } else {
//         router.push('/dashboard');
//         router.refresh();
//       }
//     }
//     setLoading(false);
//   };

//   if (!mounted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-950">
//         <div className="bg-white rounded-2xl p-8 w-full max-w-md h-96 animate-pulse" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-slate-950">
//       {/* Left: brand / route-lane panel */}
//       <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-slate-950 flex-col justify-between p-12">
//         {/* route lane SVG background */}
//         <svg
//           className="absolute inset-0 w-full h-full opacity-[0.18]"
//           viewBox="0 0 500 800"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M -20 120 C 150 80, 250 220, 500 160"
//             stroke="#F59E0B"
//             strokeWidth="2"
//             strokeDasharray="2 10"
//             strokeLinecap="round"
//           />
//           <path
//             d="M -20 340 C 180 300, 220 460, 500 400"
//             stroke="#38BDF8"
//             strokeWidth="2"
//             strokeDasharray="2 10"
//             strokeLinecap="round"
//           />
//           <path
//             d="M -20 600 C 160 640, 300 520, 500 640"
//             stroke="#F59E0B"
//             strokeWidth="4"
//             strokeDasharray="2 10"
//             strokeLinecap="round"
//           />
//           <circle cx="480" cy="160" r="5" fill="#F59E0B" />
//           <circle cx="480" cy="400" r="" fill="#38BDF8" />
//           <circle cx="480" cy="640" r="4" fill="#F59E0B" />
//         </svg>

//         <div className="relative z-10">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
//               <span className="text-slate-950 font-black text-sm">CFM</span>
//             </div>
//             <span className="text-white font-bold tracking-[0.2em] text-sm">Carrier First Management</span>
//           </div>
//         </div>

//         <div className="relative z-10">
//           <p className="text-slate-500 font-mono text-xs tracking-wider mb-3">FREIGHT PORTAL — LIVE LANES</p>
//           <h1 className="text-white text-3xl font-bold leading-snug mb-4">
//             Every load,<br />one manifest.
//           </h1>
//           <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
//             Shippers post it. Carriers bid it. Brokers move it. One portal, three roles, zero phone tag.
//           </p>
//         </div>

//         <div className="relative z-10 flex gap-6 font-mono text-xs text-slate-500">
//           <span><span className="text-amber-500">●</span> SHIPPER</span>
//           <span><span className="text-sky-400">●</span> CARRIER</span>
//           <span><span className="text-amber-500">●</span> BROKER</span>
//         </div>
//       </div>

//       {/* Right: form panel */}
//       <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
//         <div className="w-full max-w-md">
//           <div className="lg:hidden text-center mb-8">
//             <h1 className="text-xl font-bold tracking-[0.2em] text-slate-900">Carrier First Management</h1>
//             <p className="text-xs text-slate-500 mt-1 font-mono">FREIGHT PORTAL</p>
//           </div>

//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
//             <h2 className="text-lg font-semibold text-slate-900 mb-1">
//               {mode === 'login' ? 'Sign in' : 'Create your account'}
//             </h2>
//             <p className="text-sm text-slate-500 mb-6">
//               {mode === 'login'
//                 ? 'Access your loads, bids, and manifests.'
//                 : 'Pick your role — it sets what you can see and do.'}
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {mode === 'signup' && (
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
//                     I am a
//                   </label>
//                   <div className="grid grid-cols-3 gap-2">
//                     {ROLES.map((r) => (
//                       <button
//                         key={r.value}
//                         type="button"
//                         onClick={() => setRole(r.value)}
//                         className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
//                           role === r.value
//                             ? 'border-slate-900 bg-slate-900 text-white'
//                             : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
//                         }`}
//                       >
//                         <div className="text-sm font-semibold">{r.label}</div>
//                         <div className={`text-[11px] mt-0.5 leading-snug ${role === r.value ? 'text-slate-300' : 'text-slate-400'}`}>
//                           {r.blurb}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {mode === 'signup' && (
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full name</label>
//                   <input
//                     type="text"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//                     placeholder="Jane Rivera"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//                   placeholder="you@company.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={6}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//                   placeholder="••••••••"
//                 />
//               </div>

//               {error && (
//                 <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
//                   {error}
//                 </p>
//               )}
//               {success && (
//                 <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
//                   {success}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
//               >
//                 {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
//               </button>
//             </form>

//             <p className="text-center text-sm text-slate-500 mt-6">
//               {mode === 'login' ? (
//                 <>
//                   No account?{' '}
//                   <button
//                     onClick={() => setMode('signup')}
//                     className="text-slate-900 font-semibold underline"
//                   >
//                     Sign up
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{' '}
//                   <button
//                     onClick={() => setMode('login')}
//                     className="text-slate-900 font-semibold underline"
//                   >
//                     Sign in
//                   </button>
//                 </>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Role = 'shipper' | 'carrier' | 'broker_admin';

const ROLES: { value: Role; label: string; blurb: string }[] = [
  { value: 'shipper', label: 'Shipper', blurb: 'Post loads, request quotes' },
  { value: 'carrier', label: 'Carrier', blurb: 'Bid on loads, haul freight' },
  { value: 'broker_admin', label: 'Broker', blurb: 'Manage loads & pricing' },
];

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('shipper');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: '${window.location.origin}/login',
          data: {
            role,
            full_name: fullName,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created. Check your email to confirm, then sign in.');
        setMode('login');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    }
    setLoading(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md h-96 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left: brand / route-lane panel */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-slate-950 flex-col justify-between p-12">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          viewBox="0 0 500 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -20 120 C 150 80, 250 220, 500 160"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
          <path
            d="M -20 340 C 180 300, 220 460, 500 400"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
          <path
            d="M -20 600 C 160 640, 300 520, 500 640"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
          <circle cx="480" cy="160" r="5" fill="#F59E0B" />
          <circle cx="480" cy="400" r="4" fill="#38BDF8" />
          <circle cx="480" cy="640" r="4" fill="#F59E0B" />
        </svg>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
              <span className="text-slate-950 font-black text-sm">CFM</span>
            </div>
            <span className="text-white font-bold tracking-[0.2em] text-sm">Carrier First Management</span>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-slate-500 font-mono text-xs tracking-wider mb-3">FREIGHT PORTAL — LIVE LANES</p>
          <h1 className="text-white text-3xl font-bold leading-snug mb-4">
            Every load,<br />one manifest.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Shippers post it. Carriers bid it. Brokers move it. One portal, three roles, zero phone tag.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 font-mono text-xs text-slate-500">
          <span><span className="text-amber-500">●</span> SHIPPER</span>
          <span><span className="text-sky-400">●</span> CARRIER</span>
          <span><span className="text-amber-500">●</span> BROKER</span>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-xl font-bold tracking-[0.2em] text-slate-900">Carrier First Management</h1>
            <p className="text-xs text-slate-500 mt-1 font-mono">FREIGHT PORTAL</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              {mode === 'login' ? 'Sign in' : 'Create your account'}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {mode === 'login'
                ? 'Access your loads, bids, and manifests.'
                : 'Pick your role — it sets what you can see and do.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    I am a
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                          role === r.value
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-semibold">{r.label}</div>
                        <div className={`text-[11px] mt-0.5 leading-snug ${role === r.value ? 'text-slate-300' : 'text-slate-400'}`}>
                          {r.blurb}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Jane Rivera"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              {mode === 'login' ? (
                <>
                  No account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-slate-900 font-semibold underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-slate-900 font-semibold underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}