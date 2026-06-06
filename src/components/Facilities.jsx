"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bed,
  BookOpen,
  Lock,
  Wifi,
  Shield,
  Sparkles,
  Wind,
  Snowflake,
  RotateCw,
  Smile
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Facilities() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal title elements
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

      // Reveal facility cards with staggered effect
      const cards = containerRef.current.querySelectorAll(".facility-card");
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const facilities = [
    {
      icon: <Bed size={24} />,
      title: "Comfortable Beds",
      description: "Ortho mattresses for a relaxing sleep after long lectures."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Study Tables",
      description: "Dedicated personal study desk & chair setup in each room."
    },
    {
      icon: <Lock size={24} />,
      title: "Cupboards with Lockers",
      description: "Spacious individual wardrobes featuring built-in safety lockers."
    },
    {
      icon: <Wifi size={24} />,
      title: "Free 250 Mbps WiFi",
      description: "High-speed broadband seamless streaming & academic projects."
    },
    {
      icon: <Shield size={24} />,
      title: "24x7 CCTV Security",
      description: "Fully guarded premises and CCTV cameras in common areas."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Regular Cleaning",
      description: "Hygienic daily vacuum cleaning of washrooms & common lobby."
    },
    {
      icon: <Snowflake size={24} />,
      title: "Refrigerator Facility",
      description: "Common refrigeration access to keep food and drinks fresh."
    },
    {
      icon: <RotateCw size={24} />,
      title: "Washing Machines",
      description: "High-end laundry area access for easy washing and drying."
    },
    {
      icon: <Wind size={24} />,
      title: "AC & Air Cooled Rooms",
      description: "Stay cool during hot summer months with premium AC units."
    },
    {
      icon: <Smile size={24} />,
      title: "Peaceful Environment",
      description: "Quiet green neighborhood fostering deep study & mental peace."
    }
  ];

  return (
    <section
      id="facilities"
      ref={containerRef}
      className="py-24 bg-bg-secondary border-t border-b border-border-color/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            A Better Co-Living Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
            Modern Amenities & Facilities
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Everything you need for a comfortable stay near MIT ADT Campus. We focus on hygiene, convenience, and safety.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="facility-card group p-6 bg-bg-primary border border-border-color/40 rounded-2xl hover:border-primary/50 hover:bg-bg-primary hover:shadow-premium transition-all duration-300 flex flex-col items-center text-center justify-between"
            >
              {/* Icon Container with Hover Animation */}
              <div className="w-12 h-12 rounded-xl bg-bg-secondary text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center mb-5 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                {fac.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">
                  {fac.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
