import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AboutSection from "@/components/AboutSection";
import FleetSection from "@/components/FleetSection";
import BookingSection from "@/components/Bookingsection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();
  return (
   <main className="relative bg-obsidian-900" suppressHydrationWarning>
      <Navbar locale={locale} />
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <HowItWorks />
      <FleetSection />
      <BookingSection />
      <AboutSection />
      <CTASection />
      <Footer />
      <LanguageSwitcher />
      <WhatsAppButton />
    </main>
  );
}