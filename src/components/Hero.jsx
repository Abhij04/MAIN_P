"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Phone, MessageSquare, MapPin, Wifi, Shield, LayoutGrid, CheckCircle } from "lucide-react";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgesRef = useRef(null);
  const imageRef = useRef(null);
  const shapesRef = useRef(null);

  useEffect(() => {
    // GSAP page load animations
    const ctx = gsap.context(() => {
      // 1. Reveal building background image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power4.out" }
      );

      // 2. Animate floating background shapes
      if (shapesRef.current) {
        const shapes = shapesRef.current.children;
        gsap.to(shapes[0], {
          x: "30px",
          y: "-30px",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(shapes[1], {
          x: "-20px",
          y: "40px",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Staggered reveal for text & buttons
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        badgesRef.current.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.3"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappNumber = "919112669054";
  const whatsappMsg = encodeURIComponent(
    "Hello, I am interested in accommodation at Sadguru Krupa Apartments & PG. Please share room availability and pricing."
  );
  const callNumber = "tel:+919112669054";

  const badges = [
    { icon: <Wifi size={14} />, text: "Free High-Speed WiFi" },
    { icon: <CheckCircle size={14} />, text: "Fully Furnished" },
    { icon: <Shield size={14} />, text: "24x7 CCTV Security" },
    { icon: <LayoutGrid size={14} />, text: "AC & Non-AC Rooms" },
    { icon: <CheckCircle size={14} />, text: "Single & Double Occupancy" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-slate-950"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div
          ref={imageRef}
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Building_image_2.jpeg')" }}
        />
        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
      </div>

      {/* Floating Blobs (GSAP Animated) */}
      <div ref={shapesRef} className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-32 w-full">
        <div className="max-w-3xl">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6">
            <MapPin size={12} className="text-gold" />
            <span>Near MIT ADT Rajbaug Campus, Loni Kalbhor</span>
          </div>

          {/* Heading */}
          <h1
            ref={titleRef}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold !text-white leading-tight mb-6 tracking-tight"
          >
            Comfortable PG &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Fully Furnished Flats
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-light"
          >
            Safe, affordable, and student-friendly accommodation designed for focus and comfort. Experience premium living at Sadguru Krupa Apartments & PG.
          </p>

          {/* Feature Badges Grid */}
          <div
            ref={badgesRef}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:border-primary/40 hover:bg-white/10 transition-colors"
              >
                <span className="text-primary">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-4 text-sm font-extrabold rounded-2xl bg-primary hover:bg-primary-hover text-white transition-all shadow-premium hover:shadow-premium-lg hover:-translate-y-0.5 active:translate-y-0 duration-200 flex items-center gap-2"
            >
              <span>Book a Room</span>
            </a>

            <a
              href={callNumber}
              className="px-8 py-4 text-sm font-extrabold rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 flex items-center gap-2"
            >
              <Phone size={16} />
              <span>Call Now</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-sm font-extrabold rounded-2xl bg-success/15 hover:bg-success/20 border border-success/20 text-success transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 flex items-center gap-2"
            >
              <MessageSquare size={16} />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
