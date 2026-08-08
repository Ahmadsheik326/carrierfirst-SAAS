"use client";

import {
Truck,
Package,
DollarSign,
Zap,
ShieldCheck,
MapPin
} from "lucide-react";

import ScrollReveal from "./ScrollReveal";


const cards = [
{
icon: Zap,
title:"Instant bidding",
desc:"Carriers submit bids instantly and connect with the right freight faster.",
image:
"https://images.unsplash.com/photo-1586528116493-da8f9c6b2b6d?q=80&w=900"
},
{
icon: ShieldCheck,
title:"Verified accounts",
desc:"Trusted carriers, brokers, and shippers operate through verified profiles.",
image:
"https://images.unsplash.com/photo-1566576912320-4a7c8d0a4c35?q=80&w=900"
},
{
icon: MapPin,
title:"Real-time tracking",
desc:"Follow every shipment from pickup to delivery with complete visibility.",
image:
"https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=900"
}
];


export default function Marketplace(){


return (

<section
className="
relative
overflow-hidden
py-24
lg:py-32
"
>


{/* BACKGROUND IMAGE */}

<div
className="
absolute
inset-0
bg-cover
bg-center
opacity-90
"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop')"
}}
/>


{/* LIGHT OVERLAY - keeps text readable */}

<div
className="
absolute
inset-0
bg-[#f7f5ef]/20
"
/>


{/* CONTENT */}

<div
className="
relative
max-w-6xl
mx-auto
px-6
"
></div>


{/* BACKGROUND FREIGHT IMAGE */}

<div
className="
absolute
inset-0
bg-cover
bg-center
"
style={{
backgroundImage:
"url('/images/freight-background.jpg')"
}}
/>


{/* SOFT WHITE BLEND */}

<div
className="
absolute
inset-0
bg-[#f7f5ef]/75
"
/>


{/* background */}

<div
className="
absolute
inset-0
opacity-30
bg-[radial-gradient(#c9a96e_1px,transparent_1px)]
[background-size:25px_25px]
"
/>



<div className="
relative
max-w-6xl
mx-auto
px-6
">


<ScrollReveal>

<div className="
text-center
mb-14
">


<p className="
text-[#b38b4a]
uppercase
tracking-[0.3em]
text-xs
font-bold
">
What we're building
</p>


<h2 className="
mt-4
text-5xl
font-bold
text-[#08090d]
leading-tight
">
The operating system
<br/>
for modern freight
</h2>


<p className="
mt-5
text-black/50
">
One connected marketplace where carriers,
brokers, and shippers move freight faster.
</p>


</div>

</ScrollReveal>



{/* NETWORK */}

<div
className="
flex
justify-center
items-center
gap-4
mb-16
"
>


<div className="
bg-white
rounded-xl
shadow-md
border
p-6
w-40
text-center
">

<Truck
className="
mx-auto
text-[#b38b4a]
mb-3
"
/>

<h3 className="font-bold">
Carrier
</h3>

<p className="text-xs text-black/40">
Find loads
</p>


</div>




<div
className="
bg-[#08090d]
text-white
rounded-2xl
p-8
w-52
text-center
shadow-xl
shadow-[#c9a96e]/30
border
border-[#c9a96e]
"
>


<Package
className="
mx-auto
text-[#c9a96e]
mb-3
"
/>


<h3 className="font-bold text-lg">
Load Board
</h3>


<p className="text-white/50 text-xs">
Match freight instantly
</p>


</div>




<div className="
bg-white
rounded-xl
shadow-md
border
p-6
w-40
text-center
">

<DollarSign
className="
mx-auto
text-[#b38b4a]
mb-3
"
/>

<h3 className="font-bold">
Shipper
</h3>

<p className="text-xs text-black/40">
Move freight
</p>


</div>


</div>




{/* IMAGE CARDS */}


<div
className="
grid
md:grid-cols-3
gap-7
"
>


{
cards.map((c,i)=>(

<ScrollReveal
key={c.title}
delay={i*.15}
>

<div
className="
group
bg-white
rounded-3xl
overflow-hidden
border
shadow-sm
hover:-translate-y-2
transition
"
>


<div className="
h-44
overflow-hidden
"
>


<img
src={c.image}
className="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-700
"
/>


</div>




<div
className="
p-7
"
>


<div
className="
w-12
h-12
rounded-xl
bg-[#c9a96e]/10
flex
items-center
justify-center
mb-5
"
>


<c.icon
className="
text-[#b38b4a]
"
/>


</div>


<h3 className="
font-bold
text-xl
text-[#08090d]
">
{c.title}
</h3>


<p
className="
mt-3
text-black/50
leading-relaxed
text-sm
"
>
{c.desc}
</p>


</div>


</div>


</ScrollReveal>

))
}


</div>



</div>


</section>

)

}