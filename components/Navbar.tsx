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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Pourquoi nous", href: "#why" },
    { label: "Flotte", href: "#fleet" },
    { label: "Réserver", href: "#book" },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
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
        <a href="#" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Royal Drive Cameroun"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-body text-xs tracking-widest uppercase text-white/60 hover:text-gold-500 transition-colors duration-300"
                style={{ letterSpacing: "0.2em" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#book"
          className="hidden md:inline-flex btn-gold px-6 py-2.5 text-xs rounded-none"
        >
          Réserver
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-px bg-gold-500 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-gold-500 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-gold-500 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-obsidian-800/98 backdrop-blur-md border-t border-gold-500/10 px-6 py-8 flex flex-col gap-6">

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm py-2 tracking-widest uppercase text-white/70 hover:text-gold-500 transition-colors"
              style={{ letterSpacing: "0.2em" }}
            >
              {link.label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#book"
            onClick={() => setMenuOpen(false)}
            className="btn-gold px-6 py-3 text-sm text-center mt-4"
          >
            Réserver
          </a>
        </div>
      </div>
    </header>
  );
}