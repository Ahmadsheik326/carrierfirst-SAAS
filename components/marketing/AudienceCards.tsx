"use client";
import Link from "next/link";
import { ArrowRight, Truck, Briefcase, Package } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const audiences = [
  {
    icon: Truck,
    title: "Carriers",
    subtitle: "Owner-operators & fleets",
    description: "Find loads that match your lanes, equipment, and revenue goals. Bid instantly, get an answer fast, and mark it delivered right from the app.",
    cta: "Find Loads",
    href: "/subscribe",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Briefcase,
    title: "Brokers",
    subtitle: "Freight brokers & 3PLs",
    description: "Approve quotes, review bids, and watch margin calculate itself. Every document and every carrier's insurance status lives in one dashboard.",
    cta: "Post Loads",
    href: "/subscribe",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Package,
    title: "Shippers",
    subtitle: "Manufacturers & retailers",
    description: "Request a quote and get a market-accurate rate back fast. Track every load from pickup to delivery without digging through email.",
    cta: "Ship Freight",
    href: "/subscribe",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
  },
];

export default function AudienceCards() {
  return (
    <section className="py-24 lg:py-32 relative bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.08]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">Who We Serve</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Built for every link in the supply chain</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.12}>
              <div className="group relative h-full rounded-2xl overflow-hidden border border-white/10 hover:border-[#c9a96e]/30 transition-all duration-500 bg-[#111118]">
                <div className="absolute inset-0 bg-cover bg-center opacity-[0.32] group-hover:opacity-[0.22] transition-opacity duration-500" style={{ backgroundImage: `url('${a.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111118]/60 to-[#111118]" />
                <div className="relative p-8 lg:p-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-6 group-hover:bg-[#c9a96e]/20 transition-colors duration-300">
                    <a.icon className="w-6 h-6 text-[#c9a96e]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{a.title}</h3>
                  <p className="text-xs font-medium text-[#c9a96e]/70 uppercase tracking-wider mb-4">{a.subtitle}</p>
                  <p className="text-sm text-white/50 leading-relaxed flex-1 mb-6">{a.description}</p>
                  <Link href={a.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a96e] group/link">
                    {a.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}