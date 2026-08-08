// import type { Metadata } from "next";
// import Navbar from "@/components/marketing/Navbar";
// import PageHeader from "@/components/marketing/PageHeader";
// import Footer from "@/components/marketing/Footer";
// import Pricing from "@/components/marketing/Pricing";
// import ScrollReveal from "@/components/marketing/ScrollReveal";
// import { Check, HelpCircle, MessageCircle } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Pricing",
//   description: "Simple, transparent pricing for Carrier First Management. $15 per month for carriers, brokers, and shippers. 14-day free trial. No credit card required.",
// };

// const faqs = [
//   { q: "Is there really a free trial?", a: "Yes. Every plan includes a 14-day free trial with full access to all features. No credit card required to sign up." },
//   { q: "Can I switch plans later?", a: "Absolutely. Upgrade or downgrade at any time from your account dashboard. Prorated billing means you only pay for what you use." },
//   { q: "What is the difference between QuickPay and standard payment?", a: "QuickPay processes your payment within 24 hours of BOL upload for a small fee (1.5%). Standard payment follows the broker's terms, typically 15-30 days, with zero fees." },
//   { q: "Do you offer discounts for fleets?", a: "Yes. Fleets with 10+ trucks qualify for our Enterprise plan, which includes volume discounts, dedicated support, and custom integrations. Contact sales for a quote." },
//   { q: "Is there a setup fee?", a: "Never. Setup is free, and our onboarding team will walk you through account verification, equipment setup, and your first load booking at no charge." },
//   { q: "What happens after I book a load?", a: "You receive an instant rate confirmation with pickup details, contact info, and routing instructions. Our dispatch team monitors the load and is available 24/7 if issues arise." },
// ];

// const comparison = [
//   { feature: "Load searches/postings", carrier: "Unlimited", broker: "Unlimited", shipper: "Unlimited" },
//   { feature: "Rate analytics", carrier: "Basic", broker: "Advanced", shipper: "Advanced" },
//   { feature: "One-click booking", carrier: true, broker: true, shipper: true },
//   { feature: "QuickPay (24hr)", carrier: true, broker: true, shipper: false },
//   { feature: "Mobile app", carrier: true, broker: true, shipper: true },
//   { feature: "Broker credit data", carrier: "Basic", broker: "Full", shipper: "Full" },
//   { feature: "Trip optimization", carrier: true, broker: false, shipper: false },
//   { feature: "User accounts", carrier: "1", broker: "3", shipper: "Unlimited" },
//   { feature: "API access", carrier: false, broker: true, shipper: true },
//   { feature: "Dedicated account manager", carrier: false, broker: false, shipper: true },
//   { feature: "Custom reporting", carrier: false, broker: true, shipper: true },
//   { feature: "Support", carrier: "Email", broker: "Priority", shipper: "Dedicated" },
// ];

// export default function PricingPage() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <PageHeader label="Pricing" title="Simple pricing. No surprises." description="$15 per month. That is it. Every feature included. Start free and scale when you are ready." />
//         <Pricing />
//         <section className="py-16 lg:py-24">
//           <div className="max-w-5xl mx-auto px-5 lg:px-8">
//             <ScrollReveal>
//               <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12 tracking-tight">Compare all features</h2>
//             </ScrollReveal>
//             <ScrollReveal>
//               <div className="overflow-x-auto rounded-xl border border-white/5">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className="bg-white/[0.02] border-b border-white/5">
//                       <th className="px-4 py-4 text-[13px] font-bold text-white">Feature</th>
//                       <th className="px-4 py-4 text-[13px] font-bold text-[#c9a96e] text-center">Carrier</th>
//                       <th className="px-4 py-4 text-[13px] font-bold text-white/60 text-center">Broker</th>
//                       <th className="px-4 py-4 text-[13px] font-bold text-white/60 text-center">Shipper</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {comparison.map((row, i) => (
//                       <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
//                         <td className="px-4 py-3.5 text-[13px] text-white/40">{row.feature}</td>
//                         <td className="px-4 py-3.5 text-[13px] text-center">{typeof row.carrier === 'boolean' ? (row.carrier ? <Check className="w-4 h-4 text-[#c9a96e] mx-auto" /> : <span className="text-white/15">—</span>) : <span className="text-white/40">{row.carrier}</span>}</td>
//                         <td className="px-4 py-3.5 text-[13px] text-center">{typeof row.broker === 'boolean' ? (row.broker ? <Check className="w-4 h-4 text-[#c9a96e] mx-auto" /> : <span className="text-white/15">—</span>) : <span className="text-white/40">{row.broker}</span>}</td>
//                         <td className="px-4 py-3.5 text-[13px] text-center">{typeof row.shipper === 'boolean' ? (row.shipper ? <Check className="w-4 h-4 text-[#c9a96e] mx-auto" /> : <span className="text-white/15">—</span>) : <span className="text-white/40">{row.shipper}</span>}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </ScrollReveal>
//           </div>
//         </section>
//         <section className="py-16 lg:py-24 bg-white/[0.01]">
//           <div className="max-w-3xl mx-auto px-5 lg:px-8">
//             <ScrollReveal>
//               <div className="text-center mb-12">
//                 <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">FAQ</span>
//                 <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">Questions? Answered.</h2>
//               </div>
//             </ScrollReveal>
//             <div className="space-y-4">
//               {faqs.map((faq, i) => (
//                 <ScrollReveal key={i} delay={i * 0.05}>
//                   <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
//                     <div className="flex items-start gap-3">
//                       <HelpCircle className="w-5 h-5 text-[#c9a96e] mt-0.5 shrink-0" />
//                       <div>
//                         <h3 className="text-[13px] font-bold text-white mb-2">{faq.q}</h3>
//                         <p className="text-[13px] text-white/40 leading-relaxed">{faq.a}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </ScrollReveal>
//               ))}
//             </div>
//             <ScrollReveal delay={0.3}>
//               <div className="mt-10 text-center">
//                 <p className="text-[13px] text-white/20 mb-4">Still have questions?</p>
//                 <a href="mailto:info@carrierfirst.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/5 hover:border-white/10 transition-all text-[13px]">
//                   <MessageCircle className="w-4 h-4 text-[#c9a96e]" /> Chat with our team
//                 </a>
//               </div>
//             </ScrollReveal>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

import type { Metadata } from "next";

import Navbar from "@/components/marketing/Navbar";
import PageHeader from "@/components/marketing/PageHeader";
import Footer from "@/components/marketing/Footer";
import Pricing from "@/components/marketing/Pricing";
import ScrollReveal from "@/components/marketing/ScrollReveal";

import { Check, HelpCircle, MessageCircle } from "lucide-react";


export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Carrier First Management.",
};



const faqs = [
  {
    q: "Is there really a free trial?",
    a: "Yes. Every plan includes a 14-day free trial with full access to all features. No credit card required."
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade or downgrade anytime from your dashboard."
  },
  {
    q: "What is QuickPay?",
    a: "QuickPay processes payments within 24 hours after document verification."
  },
  {
    q: "Do you offer fleet discounts?",
    a: "Yes. Fleets with 10+ trucks can contact sales for custom pricing."
  },
  {
    q: "Is there a setup fee?",
    a: "Never. Setup and onboarding are completely free."
  },
  {
    q: "What happens after booking a load?",
    a: "You receive instant confirmation, pickup details, and tracking support."
  },
];



const comparison = [
  {
    feature:"Load searches/postings",
    carrier:"Unlimited",
    broker:"Unlimited",
    shipper:"Unlimited"
  },
  {
    feature:"Rate analytics",
    carrier:"Basic",
    broker:"Advanced",
    shipper:"Advanced"
  },
  {
    feature:"One-click booking",
    carrier:true,
    broker:true,
    shipper:true
  },
  {
    feature:"QuickPay",
    carrier:true,
    broker:true,
    shipper:false
  },
  {
    feature:"Mobile platform",
    carrier:true,
    broker:true,
    shipper:true
  },
  {
    feature:"Broker verification",
    carrier:"Basic",
    broker:"Full",
    shipper:"Full"
  },
  {
    feature:"Trip optimization",
    carrier:true,
    broker:false,
    shipper:false
  },
  {
    feature:"API access",
    carrier:false,
    broker:true,
    shipper:true
  },
  {
    feature:"Dedicated manager",
    carrier:false,
    broker:false,
    shipper:true
  },
];



export default function PricingPage(){

return (

<>

<Navbar />


<PageHeader

label="Pricing"

title="Simple pricing. No surprises."

description="Transparent plans built for modern freight teams."

/>



<section className="py-20 bg-[#f7f5ef]">

<Pricing />

</section>





{/* COMPARISON SECTION */}

<section className="
relative
overflow-hidden
py-32
bg-[#08090d]
">


<div
className="
absolute inset-0
bg-cover
bg-center
"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1586528116493-ad8dd3c831f5?q=80&w=2000')"
}}
/>


<div
className="
absolute inset-0
bg-[#08090d]/90
"
/>



<div className="
relative
max-w-6xl
mx-auto
px-6
">


<div className="text-center mb-16">


<p className="
text-[#c9a96e]
uppercase
tracking-[0.35em]
text-xs
font-bold
">
Compare Plans
</p>


<h2 className="
mt-5
text-5xl
font-black
text-white
">

Everything included.

<br/>

<span className="text-[#c9a96e]">
No surprises.
</span>

</h2>


<p className="
mt-5
text-white/40
">
Everything your freight business needs in one platform.
</p>


</div>





<div className="
rounded-3xl
overflow-hidden
border
border-white/10
bg-black/40
backdrop-blur-xl
">


<table className="w-full">


<thead>

<tr className="
border-b
border-white/10
text-white/50
text-xs
uppercase
">


<th className="p-6 text-left">
Feature
</th>

<th>
Carrier
</th>

<th>
Broker
</th>

<th>
Shipper
</th>


</tr>

</thead>



<tbody>


{comparison.map((row)=>(

<tr
key={row.feature}
className="
border-b
border-white/10
hover:bg-white/[0.05]
transition
">


<td className="
p-5
text-white/80
text-sm
">
{row.feature}
</td>



{
[
row.carrier,
row.broker,
row.shipper
].map((value,index)=>(


<td
key={index}
className="
text-center
text-sm
"
>


{
typeof value === "boolean"

?

value

?

<Check className="
mx-auto
w-5
h-5
text-[#c9a96e]
"/>

:

<span className="text-white/20">
—
</span>


:

<span className="text-white/60">
{value}
</span>


}


</td>


))

}



</tr>


))}


</tbody>


</table>


</div>




</div>

</section>






{/* FAQ */}


<section className="
py-28
bg-[#f7f5ef]
">


<div className="
max-w-4xl
mx-auto
px-6
">


<div className="text-center mb-12">


<p className="
text-[#c9a96e]
uppercase
tracking-widest
text-xs
font-bold
">
FAQ
</p>


<h2 className="
text-4xl
font-black
text-black
mt-4
">
Questions? Answered.
</h2>


</div>





<div className="space-y-5">


{
faqs.map((faq,i)=>(


<ScrollReveal
key={i}
delay={i*0.05}
>


<div className="
bg-white
rounded-2xl
border
border-black/10
p-6
">


<div className="
flex
gap-3
items-start
">


<HelpCircle
className="
text-[#c9a96e]
w-5
h-5
"
/>


<div>


<h3 className="
font-bold
text-black
">
{faq.q}
</h3>


<p className="
mt-2
text-black/50
text-sm
">
{faq.a}
</p>


</div>


</div>


</div>


</ScrollReveal>


))
}



</div>





<div className="
mt-12
text-center
">


<button className="
inline-flex
items-center
gap-2
px-6
py-3
rounded-xl
bg-black
text-white
font-bold
">


<MessageCircle
className="w-4 h-4"
/>

Chat with our team


</button>


</div>


</div>


</section>






<Footer />


</>

);

}