// "use client";
// import ScrollReveal from "./ScrollReveal";

// export default function PageHeader({ title, description, label }: { title: string; description: string; label?: string }) {
//   return (
//     <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]" />
//       <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#c9a96e]/[0.05] rounded-full blur-[120px]" />
//       <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
//         <ScrollReveal>
//           {label && <span className="inline-block text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">{label}</span>}
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">{title}</h1>
//           <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">{description}</p>
//         </ScrollReveal>
//       </div>
//     </section>
//   );
// }

"use client";
import ScrollReveal from "./ScrollReveal";

export default function PageHeader({ title, description, label }: { title: string; description: string; label?: string }) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.25]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/70 to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#c9a96e]/[0.08] rounded-full blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <ScrollReveal>
          {label && <span className="inline-block text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">{label}</span>}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">{title}</h1>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">{description}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}