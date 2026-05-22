"use client";

const WHATSAPP_NUMBER = "13123998042"; // TODO: Replace with your number (no + or spaces)
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to plan a trip with you.");

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden grain">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1A3A4F 0%, #2D6A8F 40%, #3D6B4F 75%, #C4713A 100%)",
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute top-[-10%] right-[-8%] w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #F5F0E8, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C4713A, transparent 70%)" }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-16">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <span
            className="text-white font-semibold text-xl tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Prasanth Travels
          </span>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
        {/* Badge */}
        <div className="fade-up inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
          AI-Powered Travel Planning
        </div>

        <h1
          className="fade-up fade-up-delay-1 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Your Dream Trip,
          <br />
          <span style={{ color: "#F5C87A" }}>Perfectly Planned.</span>
        </h1>

        <p className="fade-up fade-up-delay-2 text-white/75 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 font-light">
          Custom itineraries, hidden local gems, and hassle-free trip planning —
          all delivered fast via WhatsApp.
        </p>

        <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center gap-2 bg-[#C4713A] hover:bg-[#A85C2A] text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            Plan My Trip
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 backdrop-blur-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div className="fade-up fade-up-delay-3 flex flex-wrap items-center justify-center gap-6 mt-14 text-white/50 text-xs font-medium tracking-wider">
          <span>🌍 50+ Destinations</span>
          <span className="hidden sm:block">·</span>
          <span>⚡ Fast Turnaround</span>
          <span className="hidden sm:block">·</span>
          <span>💬 WhatsApp First</span>
          <span className="hidden sm:block">·</span>
          <span>🎯 Budget-Aware Plans</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-1 text-white/30 text-xs">
          <svg
            className="animate-bounce"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
