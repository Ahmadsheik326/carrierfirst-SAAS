'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Ordavane Holdings Group — login / sign-up page, v2 (clean, no split)
// Ready to replace app/login/page.tsx in the carrierfirst-SAAS repo.
// Design: one plain white page, no blue/white partition, no side panel,
// no card box. Big real Ordavane globe logo at the top, a thin animated
// gold route line under it, clean centred form, contact info at the foot.
// All Supabase logic from the original file is kept exactly as it was:
// roles, fields, validation, Google sign-in, sign-up metadata, and
// redirect to /dashboard on login.
//
// LOGO — IMPORTANT: save the final Ordavane globe logo image as
// public/ordavane-logo.png in the repo (the navy/teal globe with the gold
// orbit, "ORDAVANE" in navy, "HOLDINGS GROUP" in teal, on white). That is
// the file this page displays, large, on plain white — no drawn logo.
// ---------------------------------------------------------------------------

type Role = 'shipper' | 'carrier';

const ROLES: { value: Role; label: string; blurb: string }[] = [
  { value: 'shipper', label: 'Shipper', blurb: 'Post loads, request quotes' },
  { value: 'carrier', label: 'Carrier', blurb: 'Bid on loads, haul freight' },
  // Broker accounts are created by the Ordavane team in Supabase,
  // never through self-serve sign-up — as in the original file.
];

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227] transition';
const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('shipper');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const supabase = createClient();
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [dotNumber, setDotNumber] = useState('');
  const [mcNumber, setMcNumber] = useState('');
  const [ein, setEin] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      if (role === 'carrier' && !dotNumber.trim()) {
        setError('DOT number is required for carrier accounts.');
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            role,
            full_name: fullName,
            company_name: companyName,
            phone,
            dot_number: dotNumber || null,
            mc_number: role === 'carrier' ? mcNumber || null : null,
            ein: role === 'shipper' ? ein || null : null,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created. Check your email to confirm, then sign in.');
        setMode('login');
      }
      setLoading(false);
    } else {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-5 py-10 sm:py-14">
      <style>{`
        @keyframes ovFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ovDraw { from { stroke-dashoffset: 320; } to { stroke-dashoffset: 0; } }
        .ov-fade { animation: ovFadeUp 0.7s ease both; }
        .ov-fade-1 { animation-delay: 0.05s; }
        .ov-fade-2 { animation-delay: 0.15s; }
        .ov-fade-3 { animation-delay: 0.25s; }
        .ov-route { stroke-dasharray: 320; animation: ovDraw 2.2s ease forwards; }
      `}</style>

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Big real logo, plain white — no box, no background, no partition */}
        <div className="ov-fade ov-fade-1 flex flex-col items-center">
          {/* Save the final globe logo as public/ordavane-logo.png */}
          <img
            src="/ordavane-logo.png"
            alt="Ordavane Holdings Group"
            className="w-64 sm:w-72 h-auto"
          />
          {/* Animated gold route line, like the gold orbit on the logo */}
          <svg className="w-64 sm:w-72 h-6 mt-2" viewBox="0 0 288 24" fill="none" aria-hidden="true">
            <path
              className="ov-route"
              d="M4 18 C 80 2, 200 2, 284 18"
              stroke="#C9A227"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="4" cy="18" r="3.5" fill="#0A2540" />
            <circle cx="284" cy="18" r="3.5" fill="#C9A227" />
          </svg>
          <p className="text-center text-sm text-slate-500 mt-3 tracking-wide">
            Freight that moves America — and connects it to the world.
          </p>
        </div>

        {/* Form — clean, no card, no partition */}
        <div className="ov-fade ov-fade-2 w-full mt-9">
          <h1 className="text-2xl font-bold text-[#0A2540] text-center">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-slate-500 text-center mt-1.5 mb-7">
            {mode === 'login'
              ? 'Sign in to your loads, bids, and manifests.'
              : 'Pick your role — it sets what you can see and do.'}
          </p>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-50 mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs text-slate-400 font-medium">OR</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`text-left rounded-xl border px-3 py-2.5 transition ${
                        role === r.value
                          ? 'border-[#0A2540] bg-[#0A2540] text-white'
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
              <>
                <div>
                  <label className={labelClass}>Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="Mohammed Ahmed"
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Company name <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass}
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="(555) 123-4567"
                  />
                </div>

                {role === 'carrier' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>DOT number</label>
                      <input
                        type="text"
                        value={dotNumber}
                        onChange={(e) => setDotNumber(e.target.value)}
                        required
                        className={inputClass}
                        placeholder="1234567"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        MC number <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={mcNumber}
                        onChange={(e) => setMcNumber(e.target.value)}
                        className={inputClass}
                        placeholder="MC-123456"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>
                        DOT number <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={dotNumber}
                        onChange={(e) => setDotNumber(e.target.value)}
                        className={inputClass}
                        placeholder="If you also run your own fleet"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        EIN / Tax ID <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={ein}
                        onChange={(e) => setEin(e.target.value)}
                        className={inputClass}
                        placeholder="12-3456789"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <Link href="/forgot-password" className="text-xs font-semibold text-slate-500 hover:text-[#0A2540] underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className={`${inputClass} pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A2540] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#C9A227] hover:text-[#0A2540] transition disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            {mode === 'login' ? (
              <>
                No account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#0A2540] font-semibold underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#0A2540] font-semibold underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
          {mode === 'signup' && (
            <p className="text-center text-xs text-slate-400 mt-3">
              Broker accounts are created by the Ordavane team.
            </p>
          )}
        </div>

        {/* Contact info — clean, at the foot, no box */}
        <div className="ov-fade ov-fade-3 w-full mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            <a href="mailto:support@ordavanegroup.com" className="font-semibold text-[#0A2540] hover:underline">
              support@ordavanegroup.com
            </a>
            {' · '}
            <a href="tel:+17407649347" className="font-semibold text-[#0A2540] hover:underline">
              740-764-9347
            </a>
            <br />
            Mon–Fri, 9am–5pm Central Time
            <br />
            3345 Shepherds Avenue, Millersport, Ohio 43046 · Shili, Nanshan, Shenzhen, China
          </p>
          <p className="text-xs text-slate-400 mt-4">
            <Link href="https://ordavanegroup.com" className="hover:text-[#0A2540] underline">
              Back to ordavanegroup.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
