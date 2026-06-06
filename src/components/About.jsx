"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, Wifi, Home, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  
  // Stat value refs
  const statVal1 = useRef(null);
  const statVal2 = useRef(null);
  const statVal3 = useRef(null);
  const statVal4 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in about section headers and copy
      gsap.fromTo(
        [titleRef.current, textRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Stat cards fade and stagger
      const cards = containerRef.current.querySelectorAll(".stat-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
          },
        }
      );

      // Number counters animation using gsap
      const animateCounter = (ref, targetVal, suffix) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerText = Math.ceil(obj.val) + suffix;
            }
          },
        });
      };

      animateCounter(statVal1, 100, "%");
      animateCounter(statVal2, 250, " Mbps");
      animateCounter(statVal3, 60, "+");
      animateCounter(statVal4, 7, " Days/Wk");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: <ShieldAlert size={28} className="text-primary group-hover:text-white transition-colors duration-300" />,
      ref: statVal1,
      target: 100,
      suffix: "%",
      label: "CCTV Security & Safety",
      description: "24x7 security monitoring",
    },
    {
      icon: <Wifi size={28} className="text-primary group-hover:text-white transition-colors duration-300" />,
      ref: statVal2,
      target: 250,
      suffix: " Mbps",
      label: "High-Speed WiFi",
      description: "Seamless online classes",
    },
    {
      icon: <Home size={28} className="text-primary group-hover:text-white transition-colors duration-300" />,
      ref: statVal3,
      target: 60,
      suffix: "+",
      label: "Furnished Rooms",
      description: "Premium occupancy styles",
    },
    {
      icon: <Sparkles size={28} className="text-primary group-hover:text-white transition-colors duration-300" />,
      ref: statVal4,
      target: 7,
      suffix: " Days/Wk",
      label: "Regular Cleaning",
      description: "Hygienic living space",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-bg-secondary border-t border-border-color/30 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Heading and Text */}
          <div className="space-y-6">
            <div ref={titleRef} className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
                About Sadguru Krupa Apartments & PG
              </h2>
            </div>

            <div ref={textRef} className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>
                Sadguru Krupa Apartments & PG is a premium housing and co-living provider located steps away from the prestigious <strong>MIT ADT Rajbaug Campus</strong> in Loni Kalbhor, Pune. We cater specifically to students, academic professionals, and corporate trainees who demand clean, safe, and peaceful living.
              </p>
              <p>
                We offer a blend of self-contained fully-furnished apartments (1BHK & 1RK flats) and standard single/double occupancy PG rooms. Every space is curated to feel like home, featuring top-notch ventilation, modern furnishings, and a supportive environment.
              </p>
              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-primary-hover border-b-2 border-primary hover:border-primary-hover pb-1 transition-all"
                >
                  Schedule a Physical Tour
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card group p-6 bg-bg-primary border border-border-color/50 rounded-2xl shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transform duration-300 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-secondary text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                  {stat.icon}
                </div>
                <div>
                  <h3
                    ref={stat.ref}
                    className="text-3xl sm:text-4xl font-extrabold text-text-primary font-heading tracking-tight mb-2"
                  >
                    0
                  </h3>
                  <p className="text-sm font-bold text-text-primary mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
