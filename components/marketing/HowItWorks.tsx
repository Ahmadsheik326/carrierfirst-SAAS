"use client";
import { UserPlus, Search, MousePointerClick, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { step: "01", icon: UserPlus, title: "Create Your Profile", desc: "Sign up and pick your role — shipper, carrier, or broker. Each account sees exactly what it needs to." },
  { step: "02", icon: Search, title: "Find Your Loads", desc: "Carriers browse the open load board. Shippers request a quote and get a market-based rate back fast." },
  { step: "03", icon: MousePointerClick, title: "Bid and Book", desc: "Carriers bid, the broker approves it, and the load is booked and assigned — no phone tag." },
  { step: "04", icon: TrendingUp, title: "Deliver and Get Paid", desc: "Mark it picked up, in transit, delivered. The invoice generates itself the moment the freight lands." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 relative bg-[#F7F5F1]">
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#b8863f] text-[11px] font-bold uppercase tracking-[0.2em]">How It Works</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a0f] tracking-tight">From signup to delivered, four steps</h2>
          </div>
        </ScrollReveal>
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.15}>
                <div className="relative text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white border border-black/10 flex items-center justify-center mb-6 relative z-10 shadow-sm">
                      <span className="text-sm font-bold text-[#b8863f]">{s.step}</span>
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-4">
                      <s.icon className="w-8 h-8 text-[#b8863f]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#0a0a0f] mb-2">{s.title}</h3>
                  <p className="text-[13px] text-[#0a0a0f]/50 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}