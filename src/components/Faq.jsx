"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is high-speed WiFi available?",
      a: "Yes! We provide complimentary high-speed broadband WiFi (up to 250 Mbps) with multiple access points throughout the building, ensuring a stable connection for academic work, streaming, and gaming.",
    },
    {
      q: "Are AC rooms available?",
      a: "Yes, we offer both AC and air-cooled room configurations. AC rooms are available for both single and double sharing formats. Please specify your preference during inquiry.",
    },
    {
      q: "Is CCTV security provided?",
      a: "Absolutely. Safety is our top priority. We have 24x7 security personnel stationed at the main gate, biometric locks for entry, and comprehensive CCTV camera coverage in corridors, common areas, and exterior spots.",
    },
    {
      q: "Are rooms furnished?",
      a: "Yes, all our PG rooms and flats (1BHK/1RK) are fully furnished. This includes comfortable wooden/metal beds, premium Ortho mattresses, personal wardrobes with integrated safety lockers, and individual study tables and chairs.",
    },
    {
      q: "Is room cleaning and housekeeping included?",
      a: "Yes, regular housekeeping is included in the rent. Our cleaning team cleans shared corridors, stairs, and washrooms daily, and vacuums student rooms on a regular schedule to maintain hygiene.",
    },
    {
      q: "Are single occupancy rooms available?",
      a: "Yes, we provide private Single Occupancy PG rooms for students desiring isolation and focus. Alternatively, we offer self-contained 1RK flats which give you a private kitchenette, bedroom, and bathroom.",
    },
  ];

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-bg-primary"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Find answers to commonly asked questions about our facilities, services, rent, and booking options.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "bg-bg-secondary border-primary/50 shadow-premium"
                    : "bg-bg-primary border-border-color/60 hover:border-primary/30"
                }`}
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center p-6 text-left font-semibold text-text-primary hover:text-primary transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle size={18} className={`flex-shrink-0 ${isOpen ? "text-primary" : "text-text-secondary"}`} />
                    <span className="text-sm sm:text-base font-bold font-heading">{faq.q}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-text-secondary transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-border-color/30 text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
