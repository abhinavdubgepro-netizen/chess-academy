import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fusion Chess Academy - Learn Chess Online",
  description: "Online chess classes for all levels. Book your free demo class today!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#1a1a2e] text-white min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-[#16213e] border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Fusion Chess Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
