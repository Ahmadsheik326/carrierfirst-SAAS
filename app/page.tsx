import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import TrustedBy from "@/components/marketing/TrustedBy";
import AudienceCards from "@/components/marketing/AudienceCards";
import BentoStats from "@/components/marketing/BentoStats";
import Features from "@/components/marketing/Features";
import HowItWorks from "@/components/marketing/HowItWorks";
import Insurance from "@/components/marketing/Insurance";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import CTA from "@/components/marketing/CTA";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <AudienceCards />
        <BentoStats />
        <Features />
        <HowItWorks />
        <Insurance />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
