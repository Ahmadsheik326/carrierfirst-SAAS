'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Ordavane Holdings Group — redesigned login / sign-up page
// Ready to replace app/login/page.tsx in the carrierfirst-SAAS repo.
// Branding: Ordavane globe logo colours — deep navy, teal, logo gold, white.
// No old branding text remains. All Supabase logic from the
// original file is kept exactly as it was: roles, fields, validation,
// Google sign-in, sign-up metadata, and redirect to /dashboard on login.
// To use the real globe logo image instead of the inline SVG mark below,
// save it as public/ordavane-logo.png and replace the <svg> logo block
// with: <img src="/ordavane-logo.png" alt="Ordavane Holdings Group" className="h-10 w-auto" />
// ---------------------------------------------------------------------------

type Role = 'shipper' | 'carrier';

const ROLES: { value: Role; label: string; blurb: string }[] = [
  { value: 'shipper', label: 'Shipper', blurb: 'Post loads, request quotes' },
  { value: 'carrier', label: 'Carrier', blurb: 'Bid on loads, haul freight' },
  // Broker accounts are created by the Ordavane team in Supabase,
  // never through self-serve sign-up — as in the original file.
];

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-[#0A2540]';
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2540]">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md h-96 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Ordavane brand panel */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-[#0A2540] flex-col justify-between p-12">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 500 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M -20 120 C 150 80, 250 220, 500 160" stroke="#C9A227" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
          <path d="M -20 340 C 180 300, 220 460, 500 400" stroke="#2A9D8F" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
          <path d="M -20 600 C 160 640, 300 520, 500 640" stroke="#C9A227" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
          <circle cx="480" cy="160" r="5" fill="#C9A227" />
          <circle cx="480" cy="400" r="4" fill="#2A9D8F" />
          <circle cx="480" cy="640" r="4" fill="#C9A227" />
        </svg>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            {/* Ordavane globe mark — inline SVG, no image file needed */}
            <svg className="w-11 h-11 shrink-0" viewBox="0 0 48 48" fill="none" aria-label="Ordavane logo">
              <circle cx="24" cy="24" r="17" fill="#0F3557" stroke="#C9A227" strokeWidth="1.5" />
              <ellipse cx="24" cy="24" rx="8" ry="17" stroke="#2A9D8F" strokeWidth="1.2" />
              <path d="M7 24h34" stroke="#2A9D8F" strokeWidth="1.2" />
              <path d="M10 15h28M10 33h28" stroke="#2A9D8F" strokeWidth="1" opacity="0.7" />
              <ellipse cx="24" cy="24" rx="22" ry="8" stroke="#C9A227" strokeWidth="1.5" transform="rotate(-18 24 24)" />
            </svg>
            <div className="leading-none">
              <div className="text-white font-bold tracking-[0.18em] text-base">ORDAVANE</div>
              <div className="text-[#2A9D8F] font-semibold tracking-[0.32em] text-[10px] mt-1">HOLDINGS GROUP</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[#C9A227] font-mono text-xs tracking-wider mb-3">ORDA VANE PORTAL</p>
          <h1 className="text-white text-3xl font-bold leading-snug mb-4">
            Freight that moves America
            <br />
            and connects it to the world.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
            Consolidated · LTL · Truckload · Air · Sea · China → US. One portal for shippers and carriers.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex gap-6 font-mono text-xs text-slate-400">
            <span><span className="text-[#C9A227]">●</span> SHIPPER</span>
            <span><span className="text-[#2A9D8F]">●</span> CARRIER</span>
            <span><span className="text-[#C9A227]">●</span> BROKER</span>
          </div>
          <p className="text-slate-400 text-xs mt-6 leading-relaxed">
            support@ordavanegroup.com · 740-764-9347
            <br />
            Mon–Fri, 9am–5pm Central Time
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden text-center mb-8">
            <div className="text-xl font-bold tracking-[0.18em] text-[#0A2540]">ORDAVANE</div>
            <p className="text-[10px] text-[#2A9D8F] font-semibold tracking-[0.32em] mt-1">HOLDINGS GROUP</p>
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

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2.5 border border-slate-300 rounded-lg py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 mb-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
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
                        className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
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
                className="w-full bg-[#0A2540] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C9A227] hover:text-[#0A2540] transition-colors disabled:opacity-50"
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

          <p className="text-center text-xs text-slate-400 mt-6">
            <Link href="https://ordavanegroup.com" className="hover:text-[#0A2540] underline">
              Back to ordavanegroup.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
