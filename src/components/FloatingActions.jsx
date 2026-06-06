"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, Moon, Sun, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [theme, setTheme] = useState("light");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Sync theme state with document element attribute
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    checkTheme();

    // Listen for storage changes or attribute modifications
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Listen for scroll scroll-to-top button visibility
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappNumber = "919112669054";
  const whatsappMsg = encodeURIComponent(
    "Hello, I am interested in accommodation at Sadguru Krupa Apartments & PG. Please share room availability and pricing."
  );
  const callNumber = "tel:+919112669054";

  return (
    <>
      {/* Desktop Floating Action Stack (Bottom Right) */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-6 right-6 z-40">
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-bg-primary border border-border-color text-text-primary shadow-premium hover:bg-bg-secondary hover:text-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3.5 rounded-full bg-bg-primary border border-border-color text-text-secondary shadow-premium hover:bg-bg-secondary hover:text-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer active:scale-95"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* WhatsApp FAB */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-success text-white shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center"
          aria-label="WhatsApp Inquiry"
        >
          <MessageSquare size={18} className="fill-white/10" />
        </a>

        {/* Call FAB */}
        <a
          href={callNumber}
          className="p-3.5 rounded-full bg-primary text-white shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center"
          aria-label="Call Owner"
        >
          <Phone size={18} className="fill-white/10" />
        </a>
      </div>

      {/* Mobile Sticky Quick Action Bar (Bottom Screen Overlay) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-md border-t border-border-color/60 px-4 py-3 flex gap-3 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.08)]">
        {/* WhatsApp Mobile Action */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 rounded-xl bg-success text-white font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <MessageSquare size={14} />
          <span>WhatsApp Chat</span>
        </a>

        {/* Call Mobile Action */}
        <a
          href={callNumber}
          className="flex-1 py-3.5 rounded-xl bg-primary text-white font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-premium"
        >
          <Phone size={14} />
          <span>Call Owner</span>
        </a>
      </div>
    </>
  );
}
