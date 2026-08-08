// "use client";
// import { Search, Zap, BarChart3, Shield, CreditCard, Route, Headphones, Clock } from "lucide-react";
// import ScrollReveal from "./ScrollReveal";

// const list = [
//   { icon: Search, title: "Live Load Matching", desc: "Browse open freight filtered by lane, equipment, and rate — updated in real time as loads post." },
//   { icon: Zap, title: "Instant Bidding", desc: "Submit a bid and get an answer fast. No back-and-forth calls to find out if you got the load." },
//   { icon: BarChart3, title: "Market Rate Pricing", desc: "Every quote is built from real lane data, so both sides know the rate is fair before anyone bids." },
//   { icon: Shield, title: "Role-Verified Accounts", desc: "Shippers, carriers, and brokers each sign in through a checked account — no anonymous bidding." },
//   { icon: CreditCard, title: "Automated Invoicing", desc: "Invoices generate the moment a load is marked delivered. No manual line items, no chasing paperwork." },
//   { icon: Route, title: "Status Tracking", desc: "Booked, picked up, in transit, delivered — every load's status is visible to everyone on it." },
//   { icon: Clock, title: "Document Vault", desc: "Insurance certs, authority letters, and contracts live in one place, tied to the right account." },
//   { icon: Headphones, title: "Credit Tracking", desc: "Brokers see every shipper's credit limit, balance, and payment terms at a glance." },
// ];

// export default function Features() {
//   return (
//     <section className="py-24 lg:py-32 relative bg-[#0a0a0f]">
//       <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
//         <ScrollReveal>
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">Platform Features</span>
//             <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Everything runs on one screen</h2>
//             <p className="mt-4 text-white/50 text-lg">No fluff — just the tools that actually move a load from quote to paid.</p>
//           </div>
//         </ScrollReveal>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {list.map((f, i) => (
//             <ScrollReveal key={f.title} delay={i * 0.05}>
//               <div
// className="
// group
// relative
// overflow-hidden
// rounded-2xl
// bg-white/[0.03]
// border border-white/5
// hover:border-[#c9a96e]/40
// transition-all
// duration-500
// h-full
// p-6
// hover:-translate-y-1
// "
// >
//                 <div className="w-11 h-11 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-5 group-hover:bg-[#c9a96e]/20 transition-colors">
                
//                   <f.icon className="w-5 h-5 text-[#c9a96e]" />
//                 </div>
//                 <h3 className="text-[15px] font-bold text-white mb-2">{f.title}</h3>
//                 <p className="text-[13px] text-white/40 leading-relaxed">{f.desc}</p>
//               </div>
//             </ScrollReveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import {
  Search,
  Zap,
  BarChart3,
  Shield,
  CreditCard,
  Route,
  Headphones,
  Clock,
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";


const list = [
  {
    icon: Search,
    title: "Live Load Matching",
    desc: "Browse open freight filtered by lane, equipment, and rate — updated in real time as loads post.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Zap,
    title: "Instant Bidding",
    desc: "Submit a bid and get an answer fast. No back-and-forth calls to find out if you got the load.",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: BarChart3,
    title: "Market Rate Pricing",
    desc: "Every quote is built from real lane data, so both sides know the rate is fair before anyone bids.",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Shield,
    title: "Role-Verified Accounts",
    desc: "Shippers, carriers, and brokers each sign in through a checked account — no anonymous bidding.",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: CreditCard,
    title: "Automated Invoicing",
    desc: "Invoices generate the moment a load is marked delivered. No manual line items, no chasing paperwork.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Route,
    title: "Status Tracking",
    desc: "Booked, picked up, in transit, delivered — every load's status is visible to everyone on it.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Clock,
    title: "Document Vault",
    desc: "Insurance certs, authority letters, and contracts live in one place, tied to the right account.",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Headphones,
    title: "Credit Tracking",
    desc: "Brokers see every shipper's credit limit, balance, and payment terms at a glance.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
  },
];


export default function Features() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0a0a0f]">

      {/* Background image */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center
          opacity-[0.90]
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0a0f]/90" />


      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">


        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">

            <span className="
              text-[#c9a96e]
              text-[11px]
              font-bold
              uppercase
              tracking-[0.2em]
            ">
              Platform Features
            </span>


            <h2 className="
              mt-3
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-white
              tracking-tight
            ">
              Everything runs on one screen
            </h2>


            <p className="
              mt-4
              text-white/50
              text-lg
            ">
              No fluff — just the tools that actually move a load from quote to paid.
            </p>

          </div>
        </ScrollReveal>



        {/* Cards */}
        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
        ">

          {list.map((f, i) => (

            <ScrollReveal
              key={f.title}
              delay={i * 0.05}
            >

              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  h-full
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#c9a96e]/40
                "
              >


                {/* Card image */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    opacity-0
                    group-hover:opacity-40
                    transition-opacity
                    duration-500
                  "
                  style={{
                    backgroundImage:`url(${f.image})`,
                  }}
                />


                {/* Card dark layer */}
                <div className="
                  absolute
                  inset-0
                  bg-[#0a0a0f]/70
                "/>



                {/* Gold glow */}
                <div className="
                  absolute
                  -inset-20
                  bg-[#c9a96e]/10
                  blur-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "/>



                {/* Content */}
                <div className="relative z-10">


                  <div className="
                    w-11
                    h-11
                    rounded-xl
                    bg-[#c9a96e]/10
                    border
                    border-[#c9a96e]/20
                    flex
                    items-center
                    justify-center
                    mb-5
                    group-hover:bg-[#c9a96e]/20
                    transition
                  ">
                    <f.icon className="
                      w-5
                      h-5
                      text-[#c9a96e]
                    "/>
                  </div>



                  <h3 className="
                    text-[15px]
                    font-bold
                    text-white
                    mb-2
                  ">
                    {f.title}
                  </h3>



                  <p className="
                    text-[13px]
                    text-white/45
                    leading-relaxed
                  ">
                    {f.desc}
                  </p>


                </div>


              </div>

            </ScrollReveal>

          ))}

        </div>

      </div>

    </section>
  );
}