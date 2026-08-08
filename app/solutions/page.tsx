// import type { Metadata } from "next";
// import Navbar from "@/components/marketing/Navbar";
// import PageHeader from "@/components/marketing/PageHeader";
// import Footer from "@/components/marketing/Footer";
// import LoadBoardMockup from "@/components/marketing/LoadBoardMockup";
// import ScrollReveal from "@/components/marketing/ScrollReveal";
// import { Search, Zap, BarChart3, Shield, CreditCard, Route, Smartphone, Headphones, Truck, Bell, FileText, Clock } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Solutions",
//   description: "Explore Carrier First Management's complete freight platform — load board, rate analytics, fleet management, QuickPay, insurance, and mobile dispatch tools.",
// };

// const solutionsList = [
//   { icon: Search, title: "AI Load Board", subtitle: "Find the right freight in seconds", desc: "Our intelligent matching engine analyzes your equipment, preferred lanes, and revenue targets to surface the highest-paying loads first. No more scrolling through irrelevant freight.", features: ["300,000+ monthly loads across North America", "Smart filters by origin, destination, equipment, weight, and rate", "Saved searches and automated alerts", "Broker credit scores and reviews on every load", "One-click booking with instant confirmation"], hasMockup: true, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=800&auto=format&fit=crop" },
//   { icon: BarChart3, title: "Rate Analytics", subtitle: "Know what you are worth", desc: "Access the same market intelligence that enterprise brokerages use. Our rate database covers every major lane in the US and Canada, updated in real time.", features: ["Live spot market rates for Van, Reefer, and Flatbed", "7-day and 15-day rate trends", "Lane history and seasonal demand forecasting", "Rate negotiation calculator", "Export reports for your accounting team"], hasMockup: false, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
//   { icon: Route, title: "Trip Optimization", subtitle: "Maximize revenue per mile", desc: "Stop driving empty. Our engine finds backhauls, triangular routes, and multi-stop opportunities that put more money in your pocket per trip.", features: ["Automatic backhaul matching", "Triangular route suggestions", "Fuel cost vs. revenue analysis", "Toll and weigh station optimization", "Integration with major ELD providers"], hasMockup: false, image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop" },
//   { icon: CreditCard, title: "QuickPay & Factoring", subtitle: "Get paid within 24 hours", desc: "Cash flow is the lifeblood of trucking. Upload your BOL and choose QuickPay for next-day funding, or use our integrated factoring partners.", features: ["24-hour QuickPay on all loads", "Integrated factoring at competitive rates", "Automatic document verification", "Payment tracking and history", "1099 and tax document generation"], hasMockup: false, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop" },
//   { icon: Smartphone, title: "Mobile Dispatch", subtitle: "Run your business from the cab", desc: "The Carrier First mobile app puts the entire load board, dispatch tools, and payment system in your pocket. Works offline, syncs when back online.", features: ["Full load board access on iOS and Android", "Push notifications for matching loads", "Digital BOL upload and signature capture", "GPS tracking and route sharing", "In-app chat with your dispatcher"], hasMockup: false, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" },
//   { icon: Shield, title: "Broker Verification", subtitle: "Work only with partners you trust", desc: "Every broker on our platform is vetted. See credit scores, average days-to-pay, insurance status, and carrier reviews before you book.", features: ["Real-time credit scores from major bureaus", "Average days-to-pay tracking", "Insurance and bond verification", "Carrier-generated reviews and ratings", "Red-flag alerts for problematic brokers"], hasMockup: false, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" },
// ];

// const tools = [
//   { icon: Truck, title: "Fleet Tracking", desc: "Real-time GPS tracking for your entire fleet with geofencing and idle alerts." },
//   { icon: Bell, title: "Load Alerts", desc: "Get notified the moment a load matching your criteria hits the board." },
//   { icon: FileText, title: "Document Management", desc: "Store, organize, and auto-submit BOLs, rate confirmations, and lumper receipts." },
//   { icon: Clock, title: "Hours of Service", desc: "ELD integration and HOS tracking to keep you compliant and safe." },
//   { icon: Headphones, title: "24/7 Support", desc: "Phone, chat, and email support around the clock with real humans, not bots." },
//   { icon: Zap, title: "API Access", desc: "Enterprise plans get full API access to integrate with your existing TMS and accounting." },
// ];

// export default function SolutionsPage() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <PageHeader label="Solutions" title="One platform. Every mile." description="From finding your next load to getting paid, Carrier First gives you the tools to run a profitable trucking business." />
//         <section className="py-16 lg:py-24">
//           <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-24">
//             {solutionsList.map((s, i) => (
//               <ScrollReveal key={s.title} delay={0.1}>
//                 <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
//                   <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
//                     <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-6"><s.icon className="w-6 h-6 text-[#c9a96e]" /></div>
//                     <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">{s.subtitle}</span>
//                     <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">{s.title}</h2>
//                     <p className="mt-4 text-white/50 leading-relaxed">{s.desc}</p>
//                     <ul className="mt-6 space-y-3">
//                       {s.features.map((f) => (
//                         <li key={f} className="flex items-start gap-3 text-[13px] text-white/40">
//                           <div className="w-5 h-5 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mt-0.5 shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" /></div>
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
//                     {s.hasMockup ? (
//                       <div className="relative">
//                         <div className="absolute -inset-4 bg-gradient-to-r from-[#c9a96e]/10 to-transparent rounded-2xl blur-2xl" />
//                         <LoadBoardMockup />
//                       </div>
//                     ) : (
//                       <div className="relative rounded-2xl overflow-hidden group">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                         <div className="aspect-[4/3] bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
//                           <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
//                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />
//                           <div className="absolute bottom-6 left-6 right-6">
//                             <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-3"><s.icon className="w-6 h-6 text-[#c9a96e]" /></div>
//                             <h3 className="text-xl font-bold text-white">{s.title}</h3>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </section>
//         <section className="py-16 lg:py-24 bg-white/[0.01]">
//           <div className="max-w-7xl mx-auto px-5 lg:px-8">
//             <ScrollReveal>
//               <div className="text-center max-w-2xl mx-auto mb-12">
//                 <span className="text-[#c9a96e] text-[11px] font-bold uppercase tracking-[0.2em]">Also Included</span>
//                 <h2 className="mt-3 text-3xl font-bold text-white tracking-tight">Tools that keep you moving</h2>
//               </div>
//             </ScrollReveal>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {tools.map((t, i) => (
//                 <ScrollReveal key={t.title} delay={i * 0.05}>
//                   <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#c9a96e]/20 hover:bg-white/[0.05] transition-all">
//                     <div className="w-10 h-10 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-4"><t.icon className="w-5 h-5 text-[#c9a96e]" /></div>
//                     <h3 className="text-[15px] font-bold text-white mb-2">{t.title}</h3>
//                     <p className="text-[13px] text-white/40 leading-relaxed">{t.desc}</p>
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

"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import PageHeader from "@/components/marketing/PageHeader";
import ScrollReveal from "@/components/marketing/ScrollReveal";

import {
  Search,
  BarChart3,
  Route,
  CreditCard,
  Smartphone,
  Shield,
  Truck,
  Bell,
  FileText,
  Clock,
  Headphones,
  Zap,
  ArrowRight
} from "lucide-react";


const solutions = [

{
icon:Search,
title:"AI Load Board",
subtitle:"Find the right freight faster",
desc:"Connect with available freight using intelligent matching, lane preferences, equipment filters, and real-time opportunities.",
image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=1200",
features:[
"Smart load matching",
"Advanced lane search",
"Instant booking",
"Broker visibility",
"Saved searches"
]
},


{
icon:BarChart3,
title:"Rate Analytics",
subtitle:"Know your market value",
desc:"Understand lane pricing and market movement before accepting your next shipment.",
image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
features:[
"Live lane rates",
"Market trends",
"Historical pricing",
"Revenue forecasting",
"Rate comparison"
]
},


{
icon:Route,
title:"Trip Optimization",
subtitle:"Maximize every mile",
desc:"Reduce empty miles with smarter routes, backhauls, and profitable trip planning.",
image:"https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200",
features:[
"Backhaul matching",
"Route optimization",
"Fuel analysis",
"Multi-stop planning",
"Profit tracking"
]
},


{
icon:CreditCard,
title:"QuickPay & Factoring",
subtitle:"Get paid faster",
desc:"Keep your cash flow moving with digital paperwork and faster payment processing.",
image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200",
features:[
"Fast payment options",
"Digital documents",
"Invoice tracking",
"Payment history",
"Funding support"
]
},


{
icon:Smartphone,
title:"Mobile Dispatch",
subtitle:"Your operation anywhere",
desc:"Manage loads, drivers, documents, and communication from the road.",
image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
features:[
"Mobile load access",
"Driver alerts",
"GPS tracking",
"Digital BOL",
"Messaging"
]
},


{
icon:Shield,
title:"Broker Verification",
subtitle:"Book with confidence",
desc:"Review broker information, payment history, and reliability before accepting freight.",
image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200",
features:[
"Broker profiles",
"Credit information",
"Payment history",
"Trust scoring",
"Verification"
]
}

];



const tools=[
{
icon:Truck,
title:"Fleet Tracking",
desc:"Monitor trucks and shipments in real time."
},
{
icon:Bell,
title:"Load Alerts",
desc:"Instant alerts when matching freight appears."
},
{
icon:FileText,
title:"Document Management",
desc:"Keep all freight paperwork organized."
},
{
icon:Clock,
title:"Hours Tracking",
desc:"Monitor driver activity and compliance."
},
{
icon:Headphones,
title:"24/7 Support",
desc:"Real support when you need it."
},
{
icon:Zap,
title:"API Access",
desc:"Connect your existing systems."
}
];




export default function SolutionsPage(){


return(

<>


<Navbar />


<main className="
bg-[#f7f5ef]
text-[#090a0f]
overflow-hidden
">


<PageHeader

label="Solutions"

title="The operating system for modern freight"

description="One connected marketplace where carriers, brokers, and shippers move freight faster."

/>





<section className="py-24">


<div className="
max-w-7xl
mx-auto
px-6
space-y-20
">



{solutions.map((item,index)=>{


const Icon=item.icon;


return(

<ScrollReveal
key={item.title}
delay={index*.1}
>


<div
className={`
grid
lg:grid-cols-2
gap-12
items-center
rounded-3xl
p-8
lg:p-12

${
index % 2 === 0

?

"bg-white border border-black/10"

:

"bg-[#090a0f] text-white"

}

`}
>



{/* TEXT */}


<div
className={
index%2
?
"lg:order-2"
:
""
}
>


<div className="
w-12
h-12
rounded-xl
bg-[#c9a96e]/10
border
border-[#c9a96e]/30
flex
items-center
justify-center
mb-6
">


<Icon
className="text-[#c9a96e]"
/>


</div>




<p className="
text-[#c9a96e]
uppercase
tracking-[.25em]
text-xs
font-bold
">

{item.subtitle}

</p>




<h2 className="
mt-4
text-4xl
font-bold
">

{item.title}

</h2>




<p className={`
mt-5
leading-relaxed
max-w-lg

${index%2
?
"text-white/50"
:
"text-black/50"
}

`}>

{item.desc}

</p>





<ul className="mt-8 space-y-3">


{item.features.map(feature=>(


<li
key={feature}
className={`
flex
gap-3
items-center
text-sm

${index%2
?
"text-white/70"
:
"text-black/70"
}

`}
>


<span className="
w-2
h-2
rounded-full
bg-[#c9a96e]
"/>


{feature}


</li>


))}



</ul>



<button className="
mt-8
flex
items-center
gap-2
text-[#b38b4a]
font-semibold
">


Explore feature

<ArrowRight size={16}/>


</button>


</div>







{/* IMAGE */}



<div
className={
index%2
?
"lg:order-1"
:
""
}
>


<div className="
relative
overflow-hidden
rounded-3xl
group
shadow-2xl
">


<img

src={item.image}

className="
w-full
h-[420px]
object-cover
opacity-90
group-hover:scale-110
transition
duration-700
"
/>


<div className="
absolute
inset-0
bg-gradient-to-t
from-black/70
via-transparent
"
/>



<div className="
absolute
bottom-6
left-6
right-6
p-5
rounded-2xl
bg-black/50
backdrop-blur-xl
border
border-white/10
text-white
">


<h3 className="font-bold">

{item.title}

</h3>


<p className="
text-white/60
text-sm
">

Carrier First Platform

</p>


</div>


</div>



</div>



</div>



</ScrollReveal>


)


})}



</div>


</section>







<section className="
bg-[#090a0f]
text-white
py-24
">


<div className="
max-w-7xl
mx-auto
px-6
">


<div className="text-center">


<p className="
text-[#c9a96e]
uppercase
tracking-[.3em]
text-xs
">

Platform Tools

</p>


<h2 className="
text-4xl
font-bold
mt-3
">

Everything connected

</h2>


</div>





<div className="
grid
md:grid-cols-3
gap-6
mt-14
">


{tools.map(tool=>{


const Icon=tool.icon;


return(

<div
key={tool.title}
className="
bg-white/5
border
border-white/10
rounded-2xl
p-7
hover:-translate-y-2
transition
"
>


<Icon
className="
text-[#c9a96e]
mb-5
"
/>


<h3 className="
font-bold
">

{tool.title}

</h3>


<p className="
text-white/50
mt-2
text-sm
">

{tool.desc}

</p>


</div>


)


})}



</div>


</div>


</section>



</main>


<Footer />


</>

)}