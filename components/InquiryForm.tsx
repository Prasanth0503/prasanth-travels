import TripInquiryForm from "@/components/TripInquiryForm";

export default function InquiryForm() {
  return (
    <section
      id="inquiry"
      className="py-24 px-6 md:px-16"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #F5F0E8 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C4713A] mb-3">
            Get Started
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Plan Your Trip
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-md mx-auto">
            Tell us about your dream trip and we'll craft the perfect itinerary for you.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E8E0D4]">
          <TripInquiryForm />
        </div>
      </div>
    </section>
  );
}
