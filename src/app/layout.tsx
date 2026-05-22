import type { Metadata } from "next";
import "./globals.css";
import PetalsBackground from "@/components/ui/PetalsBackground";

export const metadata: Metadata = {
  title: "Naina | Floral Portfolio",
  description: "A beautiful, premium developer portfolio blooming with creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-floral">
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
