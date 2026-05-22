import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prasanth Travels – AI-Powered Travel Planning",
  description:
    "Personalized AI-powered travel planning. Custom itineraries, local experiences, and hassle-free trip planning via WhatsApp.",
  openGraph: {
    title: "Prasanth Travels – AI-Powered Travel Planning",
    description: "Custom itineraries, local experiences, and hassle-free trip planning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
