"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, MapPin, ShieldAlert, Award, Smile, Thermometer } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the progress bar line down as we scroll
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      // 2. Animate each timeline point (nodes, text) as they enter viewport
      const items = timelineRef.current.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        const dot = item.querySelector(".timeline-dot");
        const content = item.querySelector(".timeline-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          dot,
          { scale: 0.5, backgroundColor: "var(--border-color)", borderColor: "var(--border-color)" },
          {
            scale: 1,
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            duration: 0.4,
            ease: "back.out(1.8)",
          }
        ).fromTo(
          content,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.25"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const points = [
    {
      title: "1 Min from MIT ADT Rajbaug Campus",
      desc: "Located directly next to the campus. Save commuting time, avoid transport hassles, and walk to your classes in minutes.",
      icon: <MapPin size={16} />
    },
    {
      title: "Student-Focused & Peaceful Environment",
      desc: "A highly collaborative and quiet atmosphere structured specifically for study, exams, and projects.",
      icon: <Smile size={16} />
    },
    {
      title: "Affordable Luxury & Accommodation",
      desc: "Get the best value for your budget with luxury facilities, regular maintenance, and flexible rent models.",
      icon: <Award size={16} />
    },
    {
      title: "Fully Furnished Ready-To-Move Spaces",
      desc: "No furniture moving required. Rooms come pre-loaded with cupboards, beds, study desks, and basic electronics.",
      icon: <Check size={16} />
    },
    {
      title: "CCTV Guards & Secure Living",
      desc: "Strict entry gates, biometric systems, 24x7 security personnel, and comprehensive common-area CCTV.",
      icon: <ShieldAlert size={16} />
    },
    {
      title: "Hygienic and Clean Environment",
      desc: "Professional cleaning crews handle waste management, floor washing, and bathroom cleaning regularly.",
      icon: <Check size={16} />
    }
  ];

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="py-24 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            Why Sadguru Krupa?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
            The Preferred Choice for Students
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            We offer premium facilities, close proximity to MIT ADT Campus, and a student-focused environment. See what sets us apart.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Graphic and Callout Card */}
          <div className="space-y-8 lg:pr-6">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-premium-lg border border-border-color/30">
              <img
                src="/images/Building_image_1.jpeg"
                alt="Sadguru Krupa PG Building"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="text-[10px] font-extrabold uppercase bg-primary px-3 py-1 rounded-full tracking-widest">
                  Prime Location
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading">
                  Sadguru Krupa PG Exterior View
                </h3>
                <p className="text-xs text-slate-300">
                  Beautiful, secure, multi-story structure directly on the access road to MIT ADT.
                </p>
              </div>
            </div>

            {/* Quick Distance Callout */}
            <div className="p-6 rounded-2xl bg-bg-secondary border border-border-color/50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">
                  Proximity Map Callout
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  We are situated just 200 meters from the main entrance gate of MIT ADT Rajbaug Campus, Loni Kalbhor. No need for bus or auto-rickshaw rides!
                </p>
              </div>
            </div>
          </div>

          {/* Right: Scrollable Timeline */}
          <div ref={timelineRef} className="relative pl-8 sm:pl-10 py-2">
            
            {/* Background Line */}
            <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-border-color/60 origin-top" />
            
            {/* Animated Progress Line */}
            <div
              ref={progressRef}
              className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-primary origin-top scale-y-0"
            />

            {/* Timeline Items */}
            <div className="space-y-12">
              {points.map((point, index) => (
                <div key={index} className="timeline-item relative flex flex-col items-start">
                  
                  {/* Timeline Node */}
                  <div className="timeline-dot absolute left-[-24px] sm:left-[-29px] top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-bg-primary border-2 border-border-color flex items-center justify-center text-white z-10 transition-colors duration-300">
                    {point.icon}
                  </div>

                  {/* Timeline Text Content */}
                  <div className="timeline-content space-y-1.5 pl-4 sm:pl-6">
                    <h3 className="text-base sm:text-lg font-extrabold text-text-primary tracking-tight font-heading">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                      {point.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
