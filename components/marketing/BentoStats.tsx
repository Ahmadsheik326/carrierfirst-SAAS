"use client";
import { Zap, Shield, Clock, DollarSign } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// Real, verifiable features instead of invented scale numbers — a brand
// new platform doesn't have "302,348 loads posted," and claiming FMCSA
// compliance without it being actually true is a regulatory claim, not
// a marketing flourish. This section states what's actually built.
const highlights = [
  { icon: Zap, title: "Live bidding", desc: "Carriers bid, brokers approve, the load books itself — in real time." },
  { icon: Shield, title: "Verified accounts", desc: "Every shipper, carrier, and broker signs in through a role-checked account." },
  { icon: Clock, title: "Invoice on delivery", desc: "The moment a load is marked delivered, the invoice generates automatically." },
  { icon: DollarSign, title: "One flat price", desc: "$15/month. No tiers, no hidden fees, no surprise add-ons." },
];

export default function BentoStats() {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F5F1] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.4]" viewBox="0 0 1400 500" fill="none" preserveAspectRatio="none">
        <path d="M -50 100 C 300 60, 500 220, 1450 140" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
        <path d="M -50 400 C 350 440, 550 300, 1450 380" stroke="#c9a96e" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#b8863f] text-[11px] font-bold uppercase tracking-[0.2em]">What's Actually Built</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0a0a0f] tracking-tight">A new platform, built right</h2>
            <p className="mt-4 text-[#0a0a0f]/50 text-base max-w-lg mx-auto">We're early — so instead of made-up numbers, here's what's real and working today.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.title} delay={i * 0.1}>
              <div className="group relative p-6 lg:p-8 rounded-2xl bg-white border border-black/5 hover:border-[#c9a96e]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
                  <h.icon className="w-5 h-5 text-[#b8863f]" />
                </div>
                <div className="text-base font-bold text-[#0a0a0f] mb-1.5">{h.title}</div>
                <div className="text-sm text-[#0a0a0f]/50 leading-relaxed">{h.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}