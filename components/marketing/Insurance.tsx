// "use client";
// import { Shield, FileCheck, UserCheck, Lock } from "lucide-react";
// import ScrollReveal from "./ScrollReveal";

// // Removed unverified claims like specific coverage dollar amounts and
// // "FMCSA Compliant" — these are regulatory/insurance facts that must be
// // true before they're stated, not marketing copy. This describes what
// // the platform's account system actually enforces today.
// const services = [
//   { icon: Shield, title: "Role-Verified Accounts", desc: "Every shipper, carrier, and broker signs in through a checked account tied to a real role." },
//   { icon: FileCheck, title: "Document Vault", desc: "Insurance certificates, authority letters, and contracts stay attached to the right account." },
//   { icon: UserCheck, title: "Broker Oversight", desc: "Every quote, bid, and load status change runs through broker approval before it moves forward." },
//   { icon: Lock, title: "Access Controls", desc: "Each role only sees the loads, bids, and documents that belong to them." },
// ];

// export default function Insurance() {
//   return (
//     <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0a0a0f]">
//       <div className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/5 via-transparent to-[#c9a96e]/5" />
//       <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           <ScrollReveal>
//             <div>
//               <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">Trust & Access</span>
//               <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
//                 We keep the paperwork <span className="text-[#c9a96e]">honest and in order</span>
//               </h2>
//               <p className="mt-6 text-white/50 text-lg leading-relaxed">
//                 Every account on Carrier First is role-checked before it can bid,
//                 approve, or post. Documents stay attached to the account they
//                 belong to — nothing gets lost between a phone call and an inbox.
//               </p>
//             </div>
//           </ScrollReveal>
//           <div className="grid sm:grid-cols-2 gap-5">
//             {services.map((s, i) => (
//               <ScrollReveal key={s.title} delay={i * 0.1}>
//                 <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#c9a96e]/20 hover:bg-white/[0.05] transition-all duration-300 h-full">
//                   <div className="w-11 h-11 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-4">
//                     <s.icon className="w-5 h-5 text-[#c9a96e]" />
//                   </div>
//                   <h3 className="text-[15px] font-bold text-white mb-2">{s.title}</h3>
//                   <p className="text-[13px] text-white/40 leading-relaxed">{s.desc}</p>
//                 </div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import {
  ShieldCheck,
  FileCheck,
  UserCheck,
  Lock,
  CheckCircle2,
  Truck,
  DollarSign,
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";


const services = [
  {
    icon: ShieldCheck,
    title: "Verified Partners",
    desc: "Every carrier, shipper, and broker operates through a verified account.",
  },
  {
    icon: FileCheck,
    title: "Digital Paper Trail",
    desc: "Contracts, documents, and shipment records stay connected to each load.",
  },
  {
    icon: DollarSign,
    title: "Payment Visibility",
    desc: "Track approvals, invoices, and payment status without chasing updates.",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    desc: "Everyone sees only what they need — loads, bids, and documents.",
  },
];


export default function Insurance() {
  return (
    <section className="
      relative
      overflow-hidden
      py-24
      lg:py-32
      bg-[#0a0a0f]
    ">


      {/* Background glow */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-r
        from-[#c9a96e]/10
        via-transparent
        to-[#c9a96e]/5
      "/>


      <div className="
        relative
        max-w-7xl
        mx-auto
        px-5
        lg:px-8
      ">


        <div className="
          grid
          lg:grid-cols-2
          gap-16
          items-center
        ">


          {/* LEFT */}
          <ScrollReveal>

            <div>


              <span className="
                text-[#c9a96e]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.25em]
              ">
                Trust Layer
              </span>


              <h2 className="
                mt-4
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                text-white
                leading-tight
              ">

                Every load has a
                <span className="text-[#c9a96e]">
                  {" "}clear path
                </span>

              </h2>


              <p className="
                mt-6
                text-white/50
                text-lg
                leading-relaxed
                max-w-xl
              ">
                From the first quote to final delivery, every
                shipment stays organized. Verified accounts,
                connected documents, and transparent activity
                keep everyone on the same page.
              </p>


              {/* Trust points */}

              <div className="
                mt-8
                space-y-4
              ">


                {[
                  "Verified carriers and business accounts",
                  "Documents attached to every shipment",
                  "Complete load activity history",
                ].map((item)=>(

                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      text-white/70
                    "
                  >

                    <CheckCircle2
                      className="
                      w-5
                      h-5
                      text-[#c9a96e]
                      "
                    />

                    <span className="text-sm">
                      {item}
                    </span>

                  </div>

                ))}


              </div>


            </div>

          </ScrollReveal>



          {/* RIGHT */}
          <ScrollReveal delay={0.2}>


            <div className="
              relative
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
              overflow-hidden
            ">


              {/* Fake load dashboard */}

              <div className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#c9a96e]/10
                to-transparent
              "/>


              <div className="
                relative
                z-10
              ">


                <div className="
                  flex
                  justify-between
                  items-center
                  mb-6
                ">

                  <div>
                    <p className="
                      text-white/40
                      text-xs
                    ">
                      LOAD STATUS
                    </p>

                    <h3 className="
                      text-white
                      font-bold
                      mt-1
                    ">
                      #CF-48291
                    </h3>

                  </div>


                  <span className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-green-400
                    bg-green-400/10
                    px-3
                    py-1
                    rounded-full
                  ">
                    <span className="
                      w-2
                      h-2
                      bg-green-400
                      rounded-full
                    "/>

                    Active

                  </span>

                </div>




                {/* Status card */}

                <div className="
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  p-5
                  space-y-5
                ">


                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="text-white/50 text-sm">
                      Carrier
                    </span>

                    <span className="text-white text-sm flex gap-2">
                      <Truck className="w-4 h-4 text-[#c9a96e]" />
                      Verified
                    </span>

                  </div>



                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="text-white/50 text-sm">
                      Documents
                    </span>

                    <span className="text-white text-sm flex gap-2">
                      <FileCheck className="w-4 h-4 text-[#c9a96e]" />
                      Complete
                    </span>

                  </div>



                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="text-white/50 text-sm">
                      Payment
                    </span>

                    <span className="text-[#c9a96e] text-sm">
                      Approved
                    </span>

                  </div>


                </div>



                {/* Cards */}

                <div className="
                  grid
                  sm:grid-cols-2
                  gap-4
                  mt-5
                ">


                  {services.map((s)=>(

                    <div
                      key={s.title}
                      className="
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        p-4
                      "
                    >

                      <s.icon className="
                        w-5
                        h-5
                        text-[#c9a96e]
                        mb-3
                      "/>


                      <h4 className="
                        text-white
                        text-sm
                        font-bold
                      ">
                        {s.title}
                      </h4>


                      <p className="
                        text-white/40
                        text-xs
                        mt-2
                      ">
                        {s.desc}
                      </p>


                    </div>

                  ))}


                </div>


              </div>

            </div>


          </ScrollReveal>


        </div>


      </div>


    </section>
  );
}