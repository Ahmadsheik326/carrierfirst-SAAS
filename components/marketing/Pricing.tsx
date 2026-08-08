"use client";

import { Check, Truck, Building2, Factory, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";


const plans = [
  {
    name: "Carrier Plan",
    icon: Truck,
    description: "For owner-operators and small fleets",
    price: "15",
    period: "/month",
    features: [
      "Unlimited load board access",
      "Instant bidding",
      "Lane and rate visibility",
      "Status tracking on every load",
      "Digital document vault",
    ],
    cta: "Start Hauling",
    popular: true,
  },

  {
    name: "Broker Plan",
    icon: Building2,
    description: "For freight brokers and 3PLs",
    price: "0",
    period: "included",
    features: [
      "Unlimited load postings",
      "Quote and bid management",
      "Carrier communication tools",
      "Automated invoicing",
      "Document management",
    ],
    cta: "Create Account",
    popular: false,
  },

  {
    name: "Shipper Plan",
    icon: Factory,
    description: "For manufacturers and retailers",
    price: "15",
    period: "/month",
    features: [
      "Instant freight requests",
      "Market-based pricing",
      "Real-time shipment tracking",
      "Invoice history",
      "Document access",
    ],
    cta: "Ship Freight",
    popular: false,
  },
];


export default function Pricing() {


return (

<section
className="
relative
overflow-hidden
py-24
lg:py-32
bg-[#f7f6f2]
"
>


{/* subtle data background */}

<div
className="
absolute
inset-0
opacity-[0.04]
"
style={{
backgroundImage:
"radial-gradient(#111 1px, transparent 1px)",
backgroundSize:"28px 28px"
}}
/>



<div
className="
relative
max-w-6xl
mx-auto
px-5
lg:px-8
"
>



<ScrollReveal>

<div className="
text-center
max-w-3xl
mx-auto
mb-14
">


<span
className="
inline-flex
items-center
gap-2
text-[#b08a4a]
text-[26px]
font-bold
uppercase
tracking-[0.25em]
"
>

<span
className="
w-2
h-2
rounded-full
bg-[#c9a96e]
animate-pulse
"
/>

Pricing

</span>




<h2
className="
mt-5
text-4xl
sm:text-5xl
font-bold
tracking-tight
text-[#0a0a0f]
"
>

Pricing built for
<br/>
the freight marketplace

</h2>




<p
className="
mt-5
text-black/50
text-lg
"
>
Simple plans for carriers and shippers.
A complete operating platform for brokers.
</p>



</div>


</ScrollReveal>






{/* trust row */}

<div
className="
flex
flex-wrap
justify-center
gap-x-8
gap-y-3
mb-14
text-xs
uppercase
tracking-wider
text-black/40
"
>

<div className="flex items-center gap-2">
<ShieldCheck className="w-4 h-4 text-[#c9a96e]"/>
Verified Accounts
</div>


<div>
•
</div>


<div>
Real-Time Load Data
</div>


<div>
•
</div>


<div>
Secure Payments
</div>


</div>







{/* Pricing cards */}


<div
className="
grid
md:grid-cols-3
gap-6
"
>


{plans.map((plan,i)=>{


const Icon = plan.icon;


return (

<ScrollReveal
key={plan.name}
delay={i * .12}
>


<div
className={`
relative
rounded-2xl
p-8
bg-white
border
transition-all
duration-500
hover:-translate-y-2
hover:shadow-xl

${
plan.popular

?

"border-[#c9a96e] shadow-lg shadow-[#c9a96e]/20"

:

"border-black/10 hover:border-[#c9a96e]/40"

}

`}
>


{
plan.popular && (

<div
className="
absolute
top-0
left-1/2
-translate-x-1/2
-translate-y-1/2
bg-[#c9a96e]
text-[#111]
px-5
py-1.5
rounded-full
text-[10px]
font-bold
uppercase
tracking-wider
"
>
Most Popular
</div>

)
}





<div
className="
w-12
h-12
rounded-xl
bg-[#c9a96e]/10
flex
items-center
justify-center
mb-6
"
>

<Icon
className="
w-6
h-6
text-[#b08a4a]
"
/>

</div>





<h3
className="
text-xl
font-bold
text-[#0a0a0f]
"
>
{plan.name}
</h3>




<p
className="
mt-2
text-sm
text-black/50
"
>
{plan.description}
</p>






<div
className="
mt-7
flex
items-end
gap-2
"
>

<span
className="
text-5xl
font-bold
text-[#0a0a0f]
"
>
${plan.price}
</span>


<span
className="
mb-2
text-black/40
text-sm
"
>
{plan.period}
</span>


</div>







<div
className="
mt-8
space-y-4
"
>


{plan.features.map(feature=>(

<div
key={feature}
className="
flex
items-center
gap-3
text-sm
text-black/70
"
>

<Check
className="
w-4
h-4
text-[#c9a96e]
"
/>

{feature}

</div>


))}


</div>






<Link
href="/subscribe"
className={`
mt-9
block
text-center
py-3.5
rounded-xl
font-bold
text-sm
transition-all


${
plan.popular

?

"bg-[#c9a96e] hover:bg-[#b8945f] text-[#111]"

:

"bg-[#111218] hover:bg-black text-white"

}

`}
>

{plan.cta}

</Link>




</div>


</ScrollReveal>


)

})}


</div>







{/* stats */}

<div
className="
mt-20
grid
grid-cols-3
max-w-3xl
mx-auto
text-center
gap-5
"
>


<div>
<h3 className="
text-3xl
font-bold
text-[#0a0a0f]
">
24/7
</h3>

<p className="
text-sm
text-black/50
">
Marketplace Access
</p>

</div>



<div>

<h3 className="
text-3xl
font-bold
text-[#0a0a0f]
">
3
</h3>

<p className="
text-sm
text-black/50
">
Freight Roles
</p>

</div>




<div>

<h3 className="
text-3xl
font-bold
text-[#0a0a0f]
">
1
</h3>

<p className="
text-sm
text-black/50
">
Connected Platform
</p>

</div>


</div>




<p
className="
mt-10
text-center
text-xs
text-black/40
"
>
Billing starts immediately. Cancel anytime from your dashboard.
</p>




</div>


</section>

);

}