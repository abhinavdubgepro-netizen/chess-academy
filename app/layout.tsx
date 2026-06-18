"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";
import { Crown, Menu, X } from "lucide-react";
import { useState } from "react";
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

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/my-courses", label: "My Courses" },
    { href: "/classes", label: "Classes" },
    { href: "/demo", label: "Free Demo" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Crown className="w-7 h-7 text-[#f5a623]" />
            <span className="text-lg font-bold">Fusion <span className="text-[#f5a623]">Chess Academy</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-[#f5a623] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link href="/demo" className="hidden md:block px-4 py-2 rounded-lg bg-[#e94560] text-white text-sm hover:bg-[#e94560]/90 transition-all hover:scale-105">
            Book Demo
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a2e] border-t border-white/10 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm text-white/70 hover:text-[#f5a623] hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="/demo"
                className="block text-center px-4 py-2 rounded-lg bg-[#e94560] text-white text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
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
