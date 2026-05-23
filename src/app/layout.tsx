import type { Metadata } from "next";
import "./globals.css";
import PetalsBackground from "@/components/ui/PetalsBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";

import portfolioData from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: portfolioData.settings?.seoTitle || "Naina | Floral Portfolio",
  description: portfolioData.settings?.seoDescription || "A beautiful, premium developer portfolio blooming with creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-floral">
        <LoadingScreen />
        <div className="animated-bg" />
        <div className="min-h-screen relative overflow-hidden">
          <PetalsBackground />
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
