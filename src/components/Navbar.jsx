"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Phone, MessageSquare, Menu, X, Bed } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const activeTheme = savedTheme || systemTheme;
    setTheme(activeTheme);
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, []);

  // Handle scroll class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Rooms", href: "#rooms" },
    { name: "Facilities", href: "#facilities" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const whatsappNumber = "919112669054"; // owner number with country code
  const whatsappMsg = encodeURIComponent(
    "Hello, I am interested in accommodation at Sadguru Krupa Apartments & PG. Please share room availability and pricing."
  );
  const callNumber = "tel:+919112669054";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-bg-primary/80 backdrop-blur-md shadow-premium border-b border-border-color/50"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Bed size={20} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg leading-tight tracking-tight text-text-primary">
              Sadguru Krupa
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Apartments & PG
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors hover:-translate-y-[1px] transform duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-5 w-[1px] bg-border-color" />

          {/* Quick Actions & Toggle */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border-color hover:bg-bg-secondary text-text-secondary hover:text-primary transition-all shadow-sm active:scale-95"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* CTA Buttons */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-success hover:bg-success/10 border border-success/30 transition-all shadow-sm active:scale-95"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>

            <a
              href={callNumber}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-primary hover:bg-primary-hover text-white transition-all shadow-premium hover:shadow-premium-lg active:scale-95"
            >
              <Phone size={16} className="fill-white/10" />
              <span>Book Now</span>
            </a>
          </div>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-border-color hover:bg-bg-secondary text-text-secondary transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl border border-border-color bg-bg-secondary hover:bg-border-color/20 text-text-primary transition-all active:scale-95"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-40 w-72 max-w-full bg-bg-primary shadow-premium-lg border-l border-border-color transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-24">
          <div className="flex flex-col gap-4 overflow-y-auto flex-grow">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-text-primary hover:text-primary p-2 rounded-lg hover:bg-bg-secondary transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto border-t border-border-color pt-6 flex flex-col gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 w-full py-3 rounded-xl border border-success/30 text-success font-bold hover:bg-success/5 transition-all text-center"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Chat</span>
            </a>
            <a
              href={callNumber}
              className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-premium transition-all text-center"
            >
              <Phone size={18} />
              <span>Call Owner</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity"
        />
      )}
    </nav>
  );
}
