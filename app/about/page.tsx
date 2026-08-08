// import type { Metadata } from "next";
// import Navbar from "@/components/marketing/Navbar";
// import PageHeader from "@/components/marketing/PageHeader";
// import Footer from "@/components/marketing/Footer";
// import ScrollReveal from "@/components/marketing/ScrollReveal";
// import { Target, Shield, Heart, TrendingUp, Globe } from "lucide-react";

// export const metadata: Metadata = {
//   title: "About Us",
//   description: "Learn about Carrier First Management — a freight brokerage built by carriers, for carriers. Our mission, values, and the team moving North America.",
// };

// const values = [
//   { icon: Target, title: "Carrier-First Always", desc: "Every decision starts with one question: does this help the driver earn more and drive less empty?" },
//   { icon: Shield, title: "Radical Transparency", desc: "No hidden fees, no surprise deductions, no opaque algorithms. You see exactly what we see." },
//   { icon: Heart, title: "Respect for the Road", desc: "Trucking is not just a job — it is a livelihood that keeps America running. We treat every carrier like a partner." },
//   { icon: TrendingUp, title: "Data-Driven Growth", desc: "We arm you with the same market intelligence that billion-dollar brokerages use. Level the playing field." },
// ];

// const team = [
//   { name: "Muhammad Ahmad", role: "Founder & CEO", initials: "MA" },
//   { name: "Operations Team", role: "24/7 Dispatch & Support", initials: "OT" },
//   { name: "Tech Team", role: "Platform Engineering", initials: "TT" },
//   { name: "Sales Team", role: "Broker Relations", initials: "ST" },
// ];

// export default function AboutPage() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <PageHeader label="About Us" title="Built by carriers, for carriers" description="We started Carrier First because we were tired of load boards that treated drivers like an afterthought. Today, we are changing how freight moves." />
//         <section className="py-16 lg:py-24">
//           <div className="max-w-7xl mx-auto px-5 lg:px-8">
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//               <ScrollReveal>
//                 <div className="relative rounded-2xl overflow-hidden">
//                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
//                   <div className="relative p-8 lg:p-10 bg-white/[0.03] border border-white/5 rounded-2xl">
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center border border-[#c9a96e]/20"><Globe className="w-5 h-5 text-[#c9a96e]" /></div>
//                       <div><div className="text-sm font-bold text-white">Our Mission</div><div className="text-xs text-white/30">Why we exist</div></div>
//                     </div>
//                     <blockquote className="text-lg text-white/50 leading-relaxed italic">"To empower every independent carrier and small fleet with the technology, data, and relationships they need to compete — and win — against the biggest names in freight."</blockquote>
//                   </div>
//                 </div>
//               </ScrollReveal>
//               <ScrollReveal delay={0.15}>
//                 <div className="space-y-6">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">The problem we saw — and the one we are solving</h2>
//                   <p className="text-white/50 leading-relaxed">For decades, the freight industry has been stacked against small carriers. Load boards charge premium prices for outdated data. Brokers take 20-30% margins without adding proportional value. And the technology? It was built for dispatchers in offices, not drivers in cabs.</p>
//                   <p className="text-white/50 leading-relaxed">Carrier First was born in 2024 when our founder, a computer science student who grew up around trucking, decided to build the platform he wished his family had access to. Today, we serve over 12,000 carriers across the United States and Canada.</p>
//                   <div className="flex items-center gap-6 pt-2">
//                     <div className="text-center"><div className="text-2xl font-bold text-[#c9a96e]">12,000+</div><div className="text-[11px] text-white/30">Active Carriers</div></div>
//                     <div className="w-px h-10 bg-white/5" />
//                     <div className="text-center"><div className="text-2xl font-bold text-[#c9a96e]">$1.2B</div><div className="text-[11px] text-white/30">Freight Moved</div></div>
//                     <div className="w-px h-10 bg-white/5" />
//                     <div className="text-center"><div className="text-2xl font-bold text-[#c9a96e]">48 hrs</div><div className="text-[11px] text-white/30">Avg. Setup</div></div>
//                   </div>
//                 </div>
//               </ScrollReveal>
//             </div>
//           </div>
//         </section>
//         <section className="py-16 lg:py-24 bg-white/[0.01]">
//           <div className="max-w-7xl mx-auto px-5 lg:px-8">
//             <ScrollReveal>
//               <div className="text-center max-w-2xl mx-auto mb-12">
//                 <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">Our Values</span>
//                 <h2 className="mt-3 text-3xl font-bold text-white tracking-tight">What drives us every day</h2>
//               </div>
//             </ScrollReveal>
//             <div className="grid sm:grid-cols-2 gap-5">
//               {values.map((v, i) => (
//                 <ScrollReveal key={v.title} delay={i * 0.1}>
//                   <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#c9a96e]/20 hover:bg-white/[0.05] transition-all">
//                     <div className="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center mb-4"><v.icon className="w-5 h-5 text-[#c9a96e]" /></div>
//                     <h3 className="text-[15px] font-bold text-white mb-2">{v.title}</h3>
//                     <p className="text-[13px] text-white/40 leading-relaxed">{v.desc}</p>
//                   </div>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="py-16 lg:py-24">
//           <div className="max-w-7xl mx-auto px-5 lg:px-8">
//             <ScrollReveal>
//               <div className="text-center max-w-2xl mx-auto mb-12">
//                 <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">The Team</span>
//                 <h2 className="mt-3 text-3xl font-bold text-white tracking-tight">Small team, big moves</h2>
//                 <p className="mt-4 text-white/50">We are lean, distributed, and obsessed with shipping. Every person here has either driven a truck or dispatched one.</p>
//               </div>
//             </ScrollReveal>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//               {team.map((m, i) => (
//                 <ScrollReveal key={m.name} delay={i * 0.1}>
//                   <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/5">
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a96e]/30 to-[#8a7349]/30 flex items-center justify-center text-xl font-bold text-[#c9a96e] mx-auto mb-4 border border-[#c9a96e]/20">{m.initials}</div>
//                     <h3 className="text-[15px] font-bold text-white">{m.name}</h3>
//                     <p className="text-[13px] text-white/30 mt-1">{m.role}</p>
//                   </div>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import ScrollReveal from "@/components/marketing/ScrollReveal";
import {
  Target,
  Shield,
  Heart,
  TrendingUp,
  Globe,
  Truck,
  Users,
  Zap,
} from "lucide-react";


export const metadata: Metadata = {
  title: "About Us",
  description:
    "Carrier First Management is building the future operating system for freight.",
};


const values = [
  {
    icon: Target,
    title: "Carrier First",
    desc: "Every product decision starts with one goal — helping carriers earn more and waste less time.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    desc: "Clear pricing, verified partners, and real market data without hidden games.",
  },
  {
    icon: Zap,
    title: "Built With Technology",
    desc: "Modern freight tools designed for today's carriers, brokers, and shippers.",
  },
  {
    icon: TrendingUp,
    title: "Growth Driven",
    desc: "We give small fleets enterprise-level intelligence to compete. give the opertunity to all platforms",
  },
];


const stats = [
  {
    number: "12,000+",
    label: "Carriers Connected",
  },
  {
    number: "$1.2B",
    label: "Freight Managed",
  },
  {
    number: "24/7",
    label: "Platform Support",
  },
];


export default function AboutPage() {

return (

<>

<Navbar />


<main className="bg-[#08090c] text-white overflow-hidden">


{/* HERO */}

{/* HERO */}
<section className="relative min-h-[850px] flex items-center overflow-hidden">

<div
className="absolute inset-0 bg-cover bg-center"
style={{
backgroundImage:
"url(https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=2070&auto=format&fit=crop)"
}}
/>

<div className="
absolute inset-0
bg-gradient-to-r
from-[#08090c]
via-[#08090c]/90
to-[#08090c]/50
"/>


<div className="relative max-w-7xl mx-auto px-6 w-full">

<div className="
grid
lg:grid-cols-2
gap-16
items-center
">


{/* LEFT TEXT */}

<ScrollReveal>

<div>

<p className="
text-[#c9a96e]
uppercase
tracking-[0.3em]
text-xs
font-bold
mb-6
">
About Carrier First
</p>


<h1 className="
text-5xl
md:text-7xl
font-black
leading-[0.95]
tracking-tight
">

Building the
<span className="text-[#c9a96e]">
future
</span>
of freight.

</h1>


<p className="
mt-8
max-w-xl
text-lg
text-white/60
leading-relaxed
">

We are creating the operating system that connects carriers,
brokers, and shippers into one intelligent freight marketplace.

</p>


<div className="flex gap-4 mt-10">


<button className="
px-8 py-4
rounded-xl
bg-[#c9a96e]
text-black
font-bold
hover:scale-105
transition
">
Join The Platform
</button>


<button className="
px-8 py-4
rounded-xl
border border-white/20
bg-white/5
hover:bg-white/10
transition
">
Learn More
</button>


</div>


</div>

</ScrollReveal>



{/* RIGHT IMAGE CARD */}

<ScrollReveal delay={0.2}>


<div className="
relative
rounded-[35px]
overflow-hidden
border
border-white/10
shadow-2xl
">


<img
src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2400&auto=format&fit=crop"
className="
w-full
h-[520px]
object-cover
opacity-80
"
/>


<div className="
absolute inset-0
bg-gradient-to-t
from-black
via-transparent
"
/>


<div className="
absolute
bottom-8
left-8
right-8
rounded-2xl
bg-black/40
backdrop-blur-xl
border
border-white/10
p-6
">

<p className="
text-[#c9a96e]
text-xs
uppercase
tracking-widest
">
Freight Intelligence
</p>


<h3 className="
text-2xl
font-bold
mt-2
">
One platform.
Every shipment.
</h3>


</div>


</div>


</ScrollReveal>



</div>

</div>


</section>




{/* STATS */}

<section className="relative -mt-20 z-10">


<div className="
max-w-5xl
mx-auto
grid
md:grid-cols-3
gap-5
px-6
">


{stats.map((s,i)=>(

<ScrollReveal delay={i*0.1} key={s.label}>

<div className="
rounded-3xl
border
border-white/10
bg-white/[0.06]
backdrop-blur-xl
p-8
text-center
">


<h3 className="
text-4xl
font-black
text-[#c9a96e]
">
{s.number}
</h3>


<p className="
mt-2
text-sm
text-white/50
">
{s.label}
</p>


</div>


</ScrollReveal>


))}


</div>


</section>





{/* STORY */}


<section className="py-32">


<div className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-20
items-center
">


<ScrollReveal>


<div>


<p className="
text-[#c9a96e]
uppercase
tracking-widest
text-xs
font-bold
">
Our Mission
</p>


<h2 className="
mt-5
text-4xl
md:text-5xl
font-black
">
The freight industry
deserves better.
</h2>


<p className="
mt-6
text-white/50
leading-relaxed
">
For decades, independent carriers have been fighting against
complex systems, outdated technology, and limited information.
Carrier First was created to change that.
</p>


<p className="
mt-5
text-white/50
leading-relaxed
">
Our platform brings load discovery, analytics, payments,
tracking, and communication into one powerful ecosystem.
</p>


</div>


</ScrollReveal>




<ScrollReveal delay={0.2}>


<div className="
rounded-3xl
overflow-hidden
border
border-white/10
bg-white/[0.04]
">


<div className="
grid
grid-cols-2
gap-4
p-6
">


<div className="
rounded-2xl
bg-[#c9a96e]/10
p-8
">

<Truck className="text-[#c9a96e]"/>

<p className="mt-5 text-sm text-white/60">
Modern Freight Network
</p>

</div>



<div className="
rounded-2xl
bg-white/5
p-8
">

<Users className="text-[#c9a96e]"/>

<p className="mt-5 text-sm text-white/60">
Connected Partners
</p>

</div>



</div>


</div>


</ScrollReveal>



</div>

</section>





{/* VALUES */}


<section className="
py-28
bg-white/[0.02]
">


<div className="
max-w-7xl
mx-auto
px-6
">


<div className="text-center mb-16">

<p className="text-[#c9a96e] uppercase text-xs tracking-widest">
Our Principles
</p>


<h2 className="
text-4xl
font-black
mt-4
">
What drives us
</h2>

</div>



<div className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-5
">


{values.map((v,i)=>(


<ScrollReveal delay={i*.1} key={v.title}>


<div className="
group
rounded-3xl
border
border-white/10
bg-black/20
p-7
hover:border-[#c9a96e]/40
transition
">


<div className="
w-12
h-12
rounded-xl
bg-[#c9a96e]/10
flex
items-center
justify-center
">

<v.icon className="text-[#c9a96e]"/>

</div>


<h3 className="
mt-6
font-bold
text-lg
">
{v.title}
</h3>


<p className="
mt-3
text-sm
text-white/50
leading-relaxed
">
{v.desc}
</p>


</div>


</ScrollReveal>


))}


</div>


</div>


</section>




{/* FINAL CTA */}

<section className="py-32">


<div className="
max-w-5xl
mx-auto
px-6
text-center
">


<Globe className="
mx-auto
text-[#c9a96e]
"/>


<h2 className="
mt-6
text-5xl
font-black
">
The future of freight starts here.
</h2>


<p className="
mt-5
text-white/50
">
Join thousands of companies moving faster with Carrier First.
</p>


</div>


</section>



</main>


<Footer />

</>

)

}