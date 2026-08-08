"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/85 to-[#0a0a0f]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
            <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl mx-auto tracking-tight">
                Ready to move freight on one manifest?
              </h2>
              <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto">
                Shippers post it. Carriers bid it. Brokers move it. It starts
                the same way for everyone — $15/month, no hidden fees.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/subscribe" className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a96e] hover:bg-[#b8945f] text-[#0a0a0f] font-bold rounded-lg transition-all shadow-xl shadow-[#c9a96e]/15 text-sm">
                  Get Started for $15/mo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm text-sm">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}