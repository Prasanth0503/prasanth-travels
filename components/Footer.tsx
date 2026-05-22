export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/60 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">✈️</span>
          <span
            className="text-white font-semibold text-lg"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Prasanth Travels
          </span>
        </div>
        <p className="text-sm">
          AI-Powered Travel Planning · WhatsApp-First Service
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} Prasanth Travels. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
