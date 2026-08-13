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
import { createClient as createServiceClient } from '@supabase/supabase-js';

const supabasePublic = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function HomePage() {
  const { data: previewLoads } = await supabasePublic
    .from('loads')
    .select('load_id, origin, destination, equipment_type, bid_total, status')
    .in('status', ['bidding', 'in_transit', 'delivered'])
    .order('created_at', { ascending: false })
    .limit(3);
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
