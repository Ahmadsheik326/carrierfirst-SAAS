"use client";
import { Truck, Package, Layers, Container } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// Pulled from your actual pricing matrix equipment types — real product
// content instead of invented company logos.
const equipment = [
  { icon: Truck, label: "Flatbed" },
  { icon: Package, label: "Dry Van" },
  { icon: Layers, label: "Stepdeck" },
  { icon: Container, label: "Hot Shot" },
];

export default function TrustedBy() {
  return (
    <section className="py-14 border-y border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-8">
            Built for the equipment that actually moves freight
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {equipment.map((e) => (
              <div key={e.label} className="flex items-center gap-2.5 text-white/30 hover:text-[#c9a96e] transition-colors cursor-default select-none">
                <e.icon className="w-5 h-5" />
                <span className="font-semibold text-sm tracking-wide">{e.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}