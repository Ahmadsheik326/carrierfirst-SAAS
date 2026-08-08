"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { 
    const h = () => setScrolled(window.scrollY > 10); 
    window.addEventListener("scroll", h, { passive: true }); 
    return () => window.removeEventListener("scroll", h); 
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <nav className="flex items-center justify-between h-20 lg:h-24">

          {/* TEXT-ONLY LOGO — Big, Bold, Visible */}
          <Link href="/" className="group relative flex items-center">
            <div className="relative overflow-hidden">
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-[shine_1s_ease-in-out]" />
              </div>
              {/* <div className="flex flex-col items-start">
                <span className="text-[22px] lg:text-[28px] font-black tracking-tighter text-white leading-none group-hover:text-[#c9a96e] transition-colors duration-300">
                  CARRIER FIRST
                </span>
                <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.35em] text-[#c9a96e]/70 uppercase leading-none mt-1">
                  MANAGEMENT
                </span>
              </div> */}
              <div className="flex flex-col items-start">
  <span className="text-[22px] lg:text-[28px] font-black tracking-tighter text-white leading-none group-hover:text-[#c9a96e] transition-colors duration-300">
    CARRIER FIRST
  </span>

  <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.35em] text-[#c9a96e]/70 uppercase leading-none mt-1 self-center">
    MANAGEMENT
  </span>
</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#c9a96e] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">Sign In</Link>
            <Link href="/subscribe" className="px-5 py-2.5 text-[13px] font-bold text-[#0a0a0f] bg-[#c9a96e] hover:bg-[#b8945f] rounded-lg transition-all shadow-lg shadow-[#c9a96e]/15">
              Get Started
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-white/60 hover:text-white" aria-label="menu">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a0a0f]/98 backdrop-blur-xl border-b border-white/5 px-5 py-4 space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" className="block px-4 py-3 text-sm font-medium text-white/60 text-center">Sign In</Link>
            <Link href="/subscribe" className="block px-4 py-3 text-sm font-bold text-[#0a0a0f] bg-[#c9a96e] rounded-lg text-center">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
