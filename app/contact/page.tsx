// import type { Metadata } from "next";
// import Navbar from "@/components/marketing/Navbar";
// import PageHeader from "@/components/marketing/PageHeader";
// import Footer from "@/components/marketing/Footer";
// import ScrollReveal from "@/components/marketing/ScrollReveal";
// import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Contact Us",
//   description: "Get in touch with Carrier First Management. Sales, support, carrier onboarding, and partnership inquiries. We are here 24/7.",
// };

// const methods = [
//   { icon: Phone, title: "Phone Support", desc: "Speak directly with our carrier support team", value: "(800) 555-0199", href: "tel:+18005550199", available: "24/7" },
//   { icon: Mail, title: "Email Us", desc: "For sales, support, and general inquiries", value: "info@carrierfirst.com", href: "mailto:info@carrierfirst.com", available: "Response within 2 hrs" },
//   { icon: MessageSquare, title: "Live Chat", desc: "Chat with a real human on our platform", value: "Start Chat", href: "#", available: "24/7" },
//   { icon: MapPin, title: "Office", desc: "Carrier First Management, LLC", value: "Columbus, OH", href: "#", available: "Mon-Fri, 9AM-6PM EST" },
// ];

// export default function ContactPage() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <PageHeader label="Contact" title="We are here when you need us" description="Whether you are a carrier looking to get started, a broker wanting to partner, or a shipper with freight to move — our team is ready." />
//         <section className="py-16 lg:py-24">
//           <div className="max-w-7xl mx-auto px-5 lg:px-8">
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//               {methods.map((m, i) => (
//                 <ScrollReveal key={m.title} delay={i * 0.1}>
//                   <a href={m.href} className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#c9a96e]/20 transition-all h-full">
//                     <div className="w-10 h-10 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
//                       <m.icon className="w-5 h-5 text-[#c9a96e]" />
//                     </div>
//                     <h3 className="text-[15px] font-bold text-white mb-1">{m.title}</h3>
//                     <p className="text-[13px] text-white/30 mb-3">{m.desc}</p>
//                     <div className="text-[13px] font-semibold text-[#c9a96e] mb-1">{m.value}</div>
//                     <div className="flex items-center gap-1.5 text-[11px] text-white/20">
//                       <Clock className="w-3 h-3" /> {m.available}
//                     </div>
//                   </a>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="py-16 lg:py-24 bg-white/[0.01]">
//           <div className="max-w-3xl mx-auto px-5 lg:px-8">
//             <ScrollReveal>
//               <div className="text-center mb-10">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Send us a message</h2>
//                 <p className="mt-2 text-white/40">Fill out the form below and we will get back to you within 2 business hours.</p>
//               </div>
//             </ScrollReveal>
//             <ScrollReveal delay={0.1}>
//               <form className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label htmlFor="firstName" className="block text-[13px] font-medium text-white/40 mb-2">First Name</label>
//                     <input type="text" id="firstName" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e]/30 focus:ring-1 focus:ring-[#c9a96e]/10 transition-all text-[13px]" placeholder="John" />
//                   </div>
//                   <div>
//                     <label htmlFor="lastName" className="block text-[13px] font-medium text-white/40 mb-2">Last Name</label>
//                     <input type="text" id="lastName" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e]/30 focus:ring-1 focus:ring-[#c9a96e]/10 transition-all text-[13px]" placeholder="Doe" />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-[13px] font-medium text-white/40 mb-2">Email Address</label>
//                   <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e]/30 focus:ring-1 focus:ring-[#c9a96e]/10 transition-all text-[13px]" placeholder="john@yourcompany.com" />
//                 </div>
//                 <div>
//                   <label htmlFor="company" className="block text-[13px] font-medium text-white/40 mb-2">Company Name</label>
//                   <input type="text" id="company" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e]/30 focus:ring-1 focus:ring-[#c9a96e]/10 transition-all text-[13px]" placeholder="Your Trucking LLC" />
//                 </div>
//                 <div>
//                   <label htmlFor="type" className="block text-[13px] font-medium text-white/40 mb-2">I am a...</label>
//                   <select id="type" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white focus:outline-none focus:border-[#c9a96e]/30 focus:ring-1 focus:ring-[#c9a96e]/10 transition-all text-[13px] appearance-none">
//                     <option value="">Select your role</option>
//                     <option value="carrier">Carrier / Owner-Operator</option>
//                     <option value="broker">Freight Broker</option>
//                     <option value="shipper">Shipper</option>
//                     <option value="dispatcher">Dispatcher</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-[13px] font-medium text-white/40 mb-2">Message</label>
//                   <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e]/30 focus:ring-1 focus:ring-[#c9a96e]/10 transition-all resize-none text-[13px]" placeholder="Tell us how we can help you..." />
//                 </div>
//                 <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#c9a96e] hover:bg-[#b8945f] text-[#0a0a0f] font-bold rounded-lg transition-all shadow-lg shadow-[#c9a96e]/10 text-[13px]">
//                   <Send className="w-4 h-4" /> Send Message
//                 </button>
//                 <p className="text-[11px] text-white/15 text-center">By submitting, you agree to our Privacy Policy and Terms of Service.</p>
//               </form>
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
import Footer from "@/components/marketing/Footer";
import ScrollReveal from "@/components/marketing/ScrollReveal";

import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Carrier First Management. Sales, support, carrier onboarding, and partnership inquiries. We are here 24/7.",
};

const methods = [
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Speak directly with our carrier support team",
    value: "(800) 555-0199",
    href: "tel:+18005550199",
    available: "24/7"
  },
  {
    icon: Mail,
    title: "Email Us",
    desc: "For sales, support, and general inquiries",
    value: "info@carrierfirst.com",
    href: "mailto:info@carrierfirst.com",
    available: "Response within 2 hrs"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    desc: "Chat with a real human on our platform",
    value: "Start Chat",
    href: "#",
    available: "24/7"
  },
  {
    icon: MapPin,
    title: "Office",
    desc: "Carrier First Management, LLC",
    value: "Columbus, OH",
    href: "#",
    available: "Mon-Fri, 9AM-6PM EST"
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#07080b] text-white overflow-hidden">
        {/* HERO */}
        <section className="relative min-h-[720px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1586528116311-ad8dd3c831f5?q=80&w=2000)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080b] via-[#07080bcc] to-[#07080b]" />

          <div className="relative max-w-7xl mx-auto px-6 w-full">
            <ScrollReveal>
              <div className="max-w-3xl">
                <p className="text-[#c9a96e] uppercase tracking-[0.3em] text-xs font-bold mb-6">
                  Contact Carrier First
                </p>

                <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
                  Let&apos;s build the future of freight together.
                </h1>

                <p className="mt-8 text-lg text-white/60 leading-relaxed max-w-2xl">
                  Get in touch with Carrier First Management. Sales, support,
                  carrier onboarding, and partnership inquiries. We are here 24/7.
                </p>

                <div className="mt-10 flex gap-4">
                  <button className="px-8 py-4 rounded-xl bg-[#c9a96e] text-black font-bold hover:scale-105 transition">
                    Send Message
                  </button>

                  <button className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition">
                    Contact Support
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CONTACT METHODS */}
        <section className="relative -mt-24 z-20 py-24 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methods.map((m, i) => (
                <ScrollReveal key={m.title} delay={i * 0.1}>
                  <div
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      backdrop-blur-xl
                      p-7
                      min-h-[260px]
                      hover:border-[#c9a96e]/40
                      hover:-translate-y-2
                      transition-all
                      duration-500
                    "
                  >
                    {/* Glow */}
                    <div
                      className="
                        absolute
                        -top-20
                        -right-20
                        w-40
                        h-40
                        rounded-full
                        bg-[#c9a96e]/10
                        blur-3xl
                        group-hover:bg-[#c9a96e]/20
                        transition
                      "
                    />

                    {/* Icon */}
                    <div
                      className="
                        relative
                        w-14
                        h-14
                        rounded-2xl
                        bg-[#c9a96e]/10
                        border
                        border-[#c9a96e]/20
                        flex
                        items-center
                        justify-center
                        mb-8
                      "
                    >
                      <m.icon className="w-6 h-6 text-[#c9a96e]" />
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {m.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                      {m.desc}
                    </p>

                    <div className="mt-6 text-sm font-semibold text-white">
                      {m.value}
                    </div>

                    <div
                      className="
                        inline-flex
                        mt-5
                        px-3
                        py-1.5
                        rounded-full
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wider
                        bg-white/5
                        border
                        border-white/10
                        text-[#c9a96e]
                      "
                    >
                      {m.available}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div>
                <p className="text-[#c9a96e] uppercase tracking-[0.25em] text-xs font-bold">
                  Contact
                </p>

                <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight">
                  Send us a message
                </h2>

                <p className="mt-6 text-white/50 leading-relaxed">
                  Fill out the form below and we will get back to you within 2
                  business hours.
                </p>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center">
                      <Send className="text-[#c9a96e]" />
                    </div>

                    <div>
                      <p className="font-bold">Fast Response</p>
                      <p className="text-sm text-white/40">
                        Our team is ready 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <form
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  backdrop-blur-xl
                  p-8
                  space-y-5
                "
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <input placeholder="First Name" className="contact-input" />
                  <input placeholder="Last Name" className="contact-input" />
                </div>

                <input placeholder="Email Address" className="contact-input" />

                <input placeholder="Company Name" className="contact-input" />

                <select className="contact-input">
                  <option>I am a...</option>
                  <option>Carrier / Owner-Operator</option>
                  <option>Freight Broker</option>
                  <option>Shipper</option>
                  <option>Dispatcher</option>
                  <option>Other</option>
                </select>

                <textarea
                  placeholder="Message"
                  rows={6}
                  className="contact-input resize-none"
                />

                <button
                  className="
                    w-full
                    py-4
                    rounded-xl
                    bg-[#c9a96e]
                    text-black
                    font-bold
                    hover:scale-[1.02]
                    transition
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >
                  Send Message
                  <Send size={18} />
                </button>

                <p className="text-xs text-white/40 text-center">
                  By submitting, you agree to our Privacy Policy and Terms of
                  Service.
                </p>
              </form>
            </ScrollReveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-32 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop')"
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090c] via-black/80 to-[#08090c]" />

          <div className="absolute inset-0 bg-[#c9a96e]/10 blur-[120px]" />

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <ScrollReveal>
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
                  tracking-[0.25em]
                "
              >
                Ready to move freight smarter
              </div>

              <h2 className="mt-8 text-5xl md:text-7xl font-black tracking-tight leading-none">
                Let&apos;s build the{" "}
                <span className="text-[#c9a96e]">future</span> of freight.
              </h2>

              <p className="mt-6 max-w-2xl mx-auto text-lg text-white/50 leading-relaxed">
                Join carriers, brokers, and shippers using Carrier First to move
                faster, negotiate better, and grow their business.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/subscribe"
                  className="
                    px-8
                    py-4
                    rounded-xl
                    bg-[#c9a96e]
                    text-black
                    font-bold
                    hover:scale-105
                    transition
                  "
                >
                  Get Started
                </a>

                <a
                  href="/login"
                  className="
                    px-8
                    py-4
                    rounded-xl
                    border
                    border-white/20
                    bg-white/5
                    font-semibold
                    hover:bg-white/10
                    transition
                  "
                >
                  Sign In
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}