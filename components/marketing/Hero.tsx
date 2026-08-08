"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0a0a0f]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2400&auto=format&fit=crop')",
          transform: `translateY(${scrollY * 0.25}px) scale(1.1) scaleX(-1)`,
          opacity: 0.68,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-[#0a0a0f]/70 to-[#0a0a0f]" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c9a96e] text-[11px] font-bold uppercase tracking-wider mb-8 backdrop-blur-sm">
              A freight platform built from scratch — for shippers, carriers, and brokers
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold tracking-tight text-white leading-[1.05]">
              <span className="block text-white/40 font-light italic">Move freight.</span>
              <span className="block">Build profit.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl">
              One manifest for the whole load: shippers post it, carriers bid it,
              brokers move it. Market-based rates, live bidding, and paperwork
              that handles itself.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/subscribe" className="inline-flex items-center gap-2 px-7 py-4 bg-[#c9a96e] hover:bg-[#b8945f] text-[#0a0a0f] font-bold rounded-lg transition-all shadow-xl shadow-[#c9a96e]/20 text-sm">
                Start for $15/mo <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#load-board" className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm text-sm">
                <Play className="w-4 h-4 text-[#c9a96e] fill-[#c9a96e]" /> See the load board
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
<div className="dashboard-scope flex flex-col lg:flex-row min-h-screen bg-gray-50" suppressHydrationWarning></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}