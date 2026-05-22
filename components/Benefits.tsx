const benefits = [
  {
    icon: "🗺️",
    title: "Personalized Itineraries",
    description:
      "Tailored day-by-day travel plans built around your budget, travel style, and dream experiences — no two plans are the same.",
    accent: "#C4713A",
    bg: "#FDF5EE",
  },
  {
    icon: "🏡",
    title: "Local Expert Picks",
    description:
      "Skip the tourist traps. Get handpicked hidden gems, authentic local restaurants, offbeat experiences, and insider tips.",
    accent: "#2D6A8F",
    bg: "#EEF5FA",
  },
  {
    icon: "⚡",
    title: "Fast & Easy via WhatsApp",
    description:
      "Just message us on WhatsApp. Tell us your destination and budget — receive your custom itinerary quickly, hassle-free.",
    accent: "#3D6B4F",
    bg: "#EEF5F1",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C4713A] mb-3">
          Why Choose Us
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Travel Better,
          <br />
          <span className="text-[#2D6A8F]">Stress Less.</span>
        </h2>
        <p className="text-[#6B6B6B] text-lg mt-4 max-w-lg mx-auto leading-relaxed">
          We handle the research and planning so you can focus on what matters —
          experiencing the world.
        </p>
      </div>

      {/* Benefit cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{ background: b.bg }}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm"
              style={{ background: b.accent + "18" }}
            >
              {b.icon}
            </div>

            {/* Number badge */}
            <div
              className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: b.accent }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
            >
              {b.title}
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed text-sm">{b.description}</p>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: b.accent }}
            />
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "500+", label: "Happy Travelers" },
          { value: "50+", label: "Destinations" },
          { value: "24h", label: "Avg. Delivery" },
          { value: "100%", label: "Custom Plans" },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center p-6 rounded-2xl"
            style={{ background: "#F5F0E8" }}
          >
            <div
              className="text-3xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-playfair)",
                color: i % 2 === 0 ? "#C4713A" : "#2D6A8F",
              }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-[#6B6B6B] font-medium tracking-wide uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
