"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bed, Users, Square, Check, MessageSquare } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Rooms() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Reveal room cards with stagger
      const cards = containerRef.current.querySelectorAll(".room-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const rooms = [
    {
      id: "1bhk",
      name: "1BHK Flat",
      description: "Complete apartment layout offering maximum freedom and spacious co-living for students and families.",
      image: "/images/Room_image_5.jpeg",
      size: "600 Sq.Ft.",
      occupancy: "1-4 Persons",
      features: [
        "Private Bedroom",
        "Spacious Living Hall",
        "Functional Kitchen Area",
        "Attached Western Washroom",
        "Private Balcony space"
      ],
      priceTag: "Contact for Best Pricing"
    },
    {
      id: "1rk",
      name: "1RK Flat",
      description: "Self-contained cozy unit combining bedroom and kitchen space, perfect for focus and efficiency.",
      image: "/images/Room_image_6.jpeg",
      size: "420 Sq.Ft.",
      occupancy: "1-3 Persons",
      features: [
        "Spacious Single Room",
        "Kitchenette Area",
        "Attached Modern Washroom",
        "Fully Furnished Setup",
        "Excellent Ventilation"
      ],
      priceTag: "Contact for Best Pricing"
    },
    {
      id: "single",
      name: "Single Occupancy Room",
      description: "Private co-living rooms designed for individual students desiring focus, privacy, and study space.",
      image: "/images/Room_image_1.jpeg",
      size: "200 Sq.Ft.",
      occupancy: "1 Person",
      features: [
        "Complete Privacy",
        "Dedicated Study Table & Chair",
        "Personal Wardrobe with Lock",
        "Single Bed with Ortho Mattress",
        "High-Speed Wi-Fi Zone"
      ],
      priceTag: "Contact for Best Pricing"
    },
    {
      id: "double",
      name: "Double Occupancy Room",
      description: "Affordable shared rooms combining high-quality amenities with comfortable shared student living.",
      image: "/images/Room_image_3.jpeg",
      size: "280 Sq.Ft.",
      occupancy: "2 Persons",
      features: [
        "Affordable Shared Living",
        "Twin Beds & Comfortable Mattresses",
        "Dual Study Tables & Desks",
        "Spacious Lockable Storage",
        "Budget-Friendly Rental Setup"
      ],
      priceTag: "Contact for Best Pricing"
    }
  ];

  const handleInquiry = (roomName) => {
    // Fill the contact form fields
    const selectElement = document.getElementById("occupancy-select");
    if (selectElement) {
      selectElement.value = roomName;
    }

    const messageElement = document.getElementById("message-textarea");
    if (messageElement) {
      messageElement.value = `Hello, I am interested in checking availability and pricing for the "${roomName}" near MIT ADT Campus. Please let me know.`;
    }

    // Scroll smoothly to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappNumber = "919112669054";
  const getWhatsappMsg = (roomName) => {
    return encodeURIComponent(
      `Hello, I am interested in accommodation at Sadguru Krupa Apartments & PG. Please share pricing and availability for: ${roomName}.`
    );
  };

  return (
    <section
      id="rooms"
      ref={containerRef}
      className="py-24 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            Our Accommodations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
            Room Styles & Apartments
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Choose from fully self-contained apartment flats or student-friendly single & sharing PG rooms. All options come fully furnished and secure.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="room-card group flex flex-col bg-bg-secondary border border-border-color/50 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 transform"
            >
              {/* Image Container with Zoom hover */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

                {/* Meta badges over image */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-primary/95 text-white text-[11px] font-bold shadow-md">
                    <Square size={10} />
                    {room.size}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900/95 text-white text-[11px] font-bold shadow-md">
                    <Users size={10} />
                    {room.occupancy}
                  </span>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary font-heading">
                      {room.name}
                    </h3>
                    <span className="text-xs font-extrabold uppercase text-gold tracking-wider">
                      {room.priceTag}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed">
                    {room.description}
                  </p>

                  <hr className="border-border-color/50" />

                  {/* Features List */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-extrabold text-text-primary uppercase tracking-wider">
                      What's Included
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {room.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs text-text-secondary font-medium"
                        >
                          <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check size={10} className="stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="mt-8 pt-4 border-t border-border-color/50 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleInquiry(room.name)}
                    className="flex-grow py-3 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-extrabold transition-all shadow-premium active:scale-95 text-center cursor-pointer"
                  >
                    Inquire Availability
                  </button>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${getWhatsappMsg(room.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl border border-success/30 hover:bg-success/5 text-success text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp Pricing</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
