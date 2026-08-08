// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

// const footerGroups = [
//   { title: "Platform", links: ["Load Board", "Rate Analytics", "Fleet Tracking", "Mobile App"] },
//   { title: "Company", links: ["About Us", "Careers", "Contact"] },
//   { title: "Resources", links: ["Blog", "Help Center"] },
// ];

// export default function Footer() {
//   const [year, setYear] = useState("2026");
//   useEffect(() => { setYear(new Date().getFullYear().toString()); }, []);

//   return (
//     <footer className="relative bg-[#0a0a0f]">
//       <div className="max-w-7xl mx-auto px-5 lg:px-8">
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1e293b] border border-white/5 shadow-2xl shadow-black/50">
//           <div className="absolute inset-0 opacity-[0.15]" style={{
//             backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
//             backgroundSize: '60px 60px'
//           }} />
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c9a96e]/5 rounded-full blur-[120px]" />

//           <div className="relative px-8 py-14 lg:px-16 lg:py-20">
//             <div className="grid lg:grid-cols-2 gap-10 items-center">
//               <div>
//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 text-[#c9a96e] text-[11px] font-bold uppercase tracking-wider mb-6">
//                   <Sparkles className="w-3.5 h-3.5" />
//                   Built for modern carriers
//                 </div>
//                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
//                   The freight platform that puts <span className="text-[#c9a96e]">carriers first</span>
//                 </h2>
//                 <p className="mt-4 text-white/40 max-w-md">
//                   One manifest for shippers, carriers, and brokers. No hidden fees. No 30-day waits.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:justify-end">
//                 <Link href="/subscribe" className="inline-flex items-center gap-2 px-7 py-4 bg-[#c9a96e] hover:bg-[#b8945f] text-[#0a0a0f] font-bold rounded-lg transition-all shadow-lg shadow-[#c9a96e]/20 text-sm">
//                   Get Started <ArrowUpRight className="w-4 h-4" />
//                 </Link>
//                 <Link href="/login" className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 hover:border-white/20 transition-all text-sm">
//                   Sign In
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] lg:text-[200px] font-black text-white/[0.02] tracking-tighter whitespace-nowrap pointer-events-none select-none leading-none mt-[-40px]">
//           CARRIERFIRST
//         </div>
//       </div>

//       <div className="border-t border-white/5">
//         <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
//             <div className="col-span-2">
//               <Link href="/" className="inline-block">
//                 <span className="text-xl font-black tracking-tighter text-white">CARRIER FIRST</span>
//                 <span className="block text-[10px] font-bold tracking-[0.3em] text-[#c9a96e]/60 uppercase mt-0.5">Management</span>
//               </Link>
//               <p className="mt-4 text-[13px] text-white/30 max-w-xs leading-relaxed">
//                 Freight brokerage built around the load, not the paperwork.
//               </p>
//               <div className="mt-6 space-y-2">
//                 <a href="mailto:info@carrierfirst.com" className="flex items-center gap-2 text-[13px] text-white/30 hover:text-[#c9a96e] transition-colors">
//                   <Mail className="w-4 h-4" /> info@carrierfirst.com
//                 </a>
//               </div>
//             </div>
//             {footerGroups.map((group) => (
//               <div key={group.title}>
//                 <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-4">{group.title}</h4>
//                 <ul className="space-y-2.5">
//                   {group.links.map((link) => (
//                     <li key={link}>
//                       <Link href="#" className="group inline-flex items-center gap-1 text-[13px] text-white/30 hover:text-white transition-colors">
//                         {link}
//                         <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <p className="text-[11px] text-white/20">© {year} Carrier First Management, LLC. All rights reserved.</p>
//             <div className="flex items-center gap-6 text-[11px] text-white/20">
//               <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
//               <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Truck,
  ShieldCheck,
  MapPin,
  Zap,
} from "lucide-react";


const footerGroups = [
  {
    title: "Platform",
    links: [
      "Load Board",
      "Rate Analytics",
      "Fleet Tracking",
      "Mobile App",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Contact",
    ],
  },
  {
    title: "Resources",
    links: [
      "Help Center",
      "Documentation",
      "Blog",
    ],
  },
];


export default function Footer(){

const [year,setYear]=useState("2026");


useEffect(()=>{
setYear(new Date().getFullYear().toString());
},[]);



return (

<footer
className="
relative
overflow-hidden
bg-[#050507]
text-white
"
>


{/* BACKGROUND */}

<div
className="
absolute
inset-0
opacity-90
bg-cover
bg-center
"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop')"
}}
/>


<div
className="
absolute
inset-0
bg-gradient-to-b
from-[#050507]/90
via-[#050507]/95
to-[#050507]
"
/>



{/* GOLD GLOW */}

<div
className="
absolute
top-0
left-1/2
-translate-x-1/2
w-[800px]
h-[300px]
bg-[#c9a96e]/20
blur-[140px]
rounded-full
"
/>





<div
className="
relative
max-w-7xl
mx-auto
px-5
lg:px-8
py-24
"
>





{/* CTA */}

<div
className="
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
lg:p-12
"
>


<div
className="
grid
lg:grid-cols-2
gap-10
items-center
"
>


<div>


<div
className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-[#c9a96e]/10
border
border-[#c9a96e]/30
text-[#c9a96e]
text-xs
font-bold
uppercase
tracking-widest
"
>

<Truck size={14}/>
Freight Technology

</div>




<h2
className="
mt-6
text-4xl
lg:text-5xl
font-black
leading-tight
"
>

Move freight
<br/>

<span className="text-[#c9a96e]">
without friction
</span>

</h2>



<p
className="
mt-5
max-w-lg
text-white/50
text-lg
leading-relaxed
"
>

A modern freight marketplace connecting
carriers, brokers, and shippers with
visibility from pickup to delivery.

</p>


</div>






<div
className="
flex
flex-col
sm:flex-row
lg:justify-end
gap-4
"
>


<Link
href="/subscribe"
className="
px-8
py-4
rounded-xl
bg-[#c9a96e]
text-[#050507]
font-bold
text-sm
flex
items-center
justify-center
gap-2
hover:bg-[#b8945f]
transition
shadow-xl
shadow-[#c9a96e]/20
"
>

Start Shipping

<ArrowUpRight size={17}/>

</Link>




<Link
href="/login"
className="
px-8
py-4
rounded-xl
border
border-white/15
bg-white/5
font-semibold
text-sm
flex
items-center
justify-center
hover:bg-white/10
transition
"
>

Sign In

</Link>


</div>



</div>



</div>








{/* FEATURES STRIP */}


<div
className="
grid
md:grid-cols-3
gap-5
mt-10
"
>


<div
className="
rounded-2xl
border
border-white/10
bg-white/[0.03]
p-6
"
>

<Zap
className="
text-[#c9a96e]
mb-4
"
/>

<h3 className="font-bold">
Instant Matching
</h3>

<p className="
text-sm
text-white/40
mt-2
">
Connect the right load with the right carrier.
</p>

</div>





<div
className="
rounded-2xl
border
border-white/10
bg-white/[0.03]
p-6
"
>

<ShieldCheck
className="
text-[#c9a96e]
mb-4
"
/>


<h3 className="font-bold">
Verified Network
</h3>

<p className="
text-sm
text-white/40
mt-2
">
Trusted accounts and organized documents.
</p>

</div>





<div
className="
rounded-2xl
border
border-white/10
bg-white/[0.03]
p-6
"
>

<MapPin
className="
text-[#c9a96e]
mb-4
"
/>


<h3 className="font-bold">
Real-Time Visibility
</h3>

<p className="
text-sm
text-white/40
mt-2
">
Track every shipment across the network.
</p>

</div>



</div>









{/* FOOTER LINKS */}


<div
className="
mt-20
grid
grid-cols-2
md:grid-cols-5
gap-10
"
>



<div
className="
col-span-2
"
>


<h3
className="
text-2xl
font-black
tracking-tight
"
>
CARRIER FIRST
</h3>


<p
className="
text-[10px]
tracking-[0.35em]
uppercase
text-[#c9a96e]
mt-1
"
>
Management
</p>



<p
className="
mt-5
max-w-xs
text-sm
text-white/40
leading-relaxed
"
>
Freight technology built around
speed, transparency, and trust.
</p>



<a
href="mailto:info@carrierfirst.com"
className="
mt-5
flex
items-center
gap-2
text-sm
text-white/50
hover:text-[#c9a96e]
"
>

<Mail size={15}/>

info@carrierfirst.com

</a>


</div>





{
footerGroups.map(group=>(

<div key={group.title}>


<h4
className="
text-xs
font-bold
uppercase
tracking-widest
text-white/40
mb-5
"
>
{group.title}
</h4>


<ul className="space-y-3">

{
group.links.map(link=>(

<li key={link}>

<Link
href="#"
className="
text-sm
text-white/40
hover:text-white
flex
items-center
gap-2
transition
"
>

{link}

<ArrowUpRight
size={12}
/>

</Link>


</li>

))
}


</ul>


</div>

))
}


</div>








{/* BOTTOM */}

<div
className="
mt-16
pt-8
border-t
border-white/10
flex
flex-col
sm:flex-row
justify-between
gap-4
text-xs
text-white/30
"
>


<p>
© {year} Carrier First Management, LLC. All rights reserved.
</p>


<div className="flex gap-6">

<Link href="#">
Privacy
</Link>

<Link href="#">
Terms
</Link>

</div>


</div>






</div>


</footer>

)

}