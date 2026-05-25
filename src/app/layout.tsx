import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';

const PetalsBackground = dynamic(() => import('@/components/ui/PetalsBackground'));
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'));
import { getPortfolioData } from "@/lib/data";
import { PortfolioProvider } from "@/components/ui/PortfolioProvider";

export async function generateMetadata(): Promise<Metadata> {
  const portfolioData = await getPortfolioData();
  return {
    title: portfolioData.settings?.seoTitle || "Naina | Floral Portfolio",
    description: portfolioData.settings?.seoDescription || "A beautiful, premium developer portfolio blooming with creativity.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolioData = await getPortfolioData();
  return (
    <html lang="en">
      <body className="bg-gradient-floral">
        <PortfolioProvider data={portfolioData}>
          <LoadingScreen />
          <div className="animated-bg" />
          <div className="min-h-screen relative overflow-hidden">
            <PetalsBackground />
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </PortfolioProvider>
      </body>
    </html>
  );
}
