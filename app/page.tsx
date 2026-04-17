import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="relative bg-obsidian-900">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <HowItWorks />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
