"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why" },
    { label: "How It Works", href: "#how" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian-900/95 backdrop-blur-md border-b border-gold-500/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col items-start group">
          <span
            className="font-display text-gold-500 text-xl sm:text-2xl leading-none tracking-wider"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Royal Drive
          </span>
          <span
            className="font-body text-white/40 text-[9px] tracking-[0.35em] uppercase mt-0.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Cameroun
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-body text-xs tracking-widest uppercase text-white/60 hover:text-gold-500 transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)", letterSpacing: "0.2em" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#services"
          className="hidden md:inline-flex btn-gold px-6 py-2.5 text-xs rounded-none"
        >
          Book Now
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-gold-500 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-gold-500 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-gold-500 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-obsidian-800/98 backdrop-blur-md border-t border-gold-500/10 px-5 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-xs tracking-widest uppercase text-white/60 hover:text-gold-500 transition-colors"
              style={{ letterSpacing: "0.2em" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
            className="btn-gold px-6 py-3 text-xs text-center mt-2"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
