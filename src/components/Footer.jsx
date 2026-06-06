"use client";

import { Bed, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Property", href: "#about" },
    { name: "Room & Pricing", href: "#rooms" },
    { name: "Facilities", href: "#facilities" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Photo Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Book Tour", href: "#contact" },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-border-color pt-16 pb-24 md:pb-12 text-text-secondary">
      
      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-md">
              <Bed size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base leading-tight tracking-tight text-text-primary">
                Sadguru Krupa
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Apartments & PG
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
            Providing premium co-living student accommodation and rental flats near MIT ADT Campus. We ensure safety, comfort, hygiene, and a focus-driven environment for our residents.
          </p>
        </div>

        {/* Quick Links Column (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-xs font-extrabold text-text-primary uppercase tracking-widest">
            Quick Navigation
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm hover:text-primary transition-colors flex items-center gap-1 group font-medium"
                >
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address and Contact Column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-xs font-extrabold text-text-primary uppercase tracking-widest">
            Contact Details
          </h3>
          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed font-semibold text-text-primary">
                Sadguru Krupa Apartments & PG<br />
                Near MIT ADT Rajbaug Campus, Loni Kalbhor, Solapur Highway, Pune, Maharashtra - 412201
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-primary flex-shrink-0" />
              <div className="space-x-4 font-bold text-text-primary">
                <a href="tel:+919112669054" className="hover:text-primary transition-colors">
                  9112669054
                </a>
                <span>/</span>
                <a href="tel:+917888225849" className="hover:text-primary transition-colors">
                  7888225849
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-primary flex-shrink-0" />
              <a href="mailto:inquiry@sadgurupg.com" className="hover:text-primary transition-colors font-medium">
                inquiry@sadgurupg.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border-color/60 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <p className="font-semibold text-text-secondary">
          &copy; 2026 Sadguru Krupa Apartments & PG. All Rights Reserved.
        </p>
        <p className="text-slate-400">
          Designed with premium aesthetics & GSAP.
        </p>
      </div>
    </footer>
  );
}
