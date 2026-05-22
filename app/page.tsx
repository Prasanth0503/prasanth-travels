import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import InquiryForm from "@/components/InquiryForm";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <Hero />
      <Benefits />
      <InquiryForm />
      <WhatsAppCTA />
      <Footer />
    </main>
  );
}
