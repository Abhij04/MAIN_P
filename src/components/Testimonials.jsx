"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef(null);

  const reviews = [
    {
      name: "Rohan Deshmukh",
      role: "B.Tech CSE Student, MIT ADT",
      stars: 5,
      content: "The proximity to MIT ADT Rajbaug Campus is absolute gold. It takes me exactly 2 minutes to walk to classes. The 250 Mbps Wi-Fi has never lagged during online projects or coding sessions, and the environment is extremely quiet and clean.",
    },
    {
      name: "Ananya Iyer",
      role: "Design Trainee, Loni Kalbhor",
      stars: 5,
      content: "I rent a 1RK flat here and couldn't be happier. Having my own private bathroom, desk space, and compact kitchenette is exactly what I wanted. CCTV security and regular waste cleaning make it feel safe and premium.",
    },
    {
      name: "Vikram Malhotra",
      role: "Mechanical Trainee, Pune",
      stars: 5,
      content: "We share a double occupancy room at Sadguru Krupa. It is very budget-friendly for the kind of furnishings we got - cupboards with lockers, custom desks, and comfortable beds. Cleaning service is regular and hassle-free.",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Animate slide change using GSAP
  useEffect(() => {
    if (!testimonialRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }, testimonialRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // Autoplay timer
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 bg-bg-secondary border-t border-b border-border-color/30"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            Student & Parent Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-heading">
            What Our Residents Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-bg-primary border border-border-color/50 rounded-3xl p-8 sm:p-12 shadow-premium hover:shadow-premium-lg transition-all duration-300">
          
          {/* Quote Icon overlay */}
          <div className="absolute top-6 left-6 text-primary/10 select-none pointer-events-none">
            <Quote size={80} className="stroke-[1.5]" />
          </div>

          {/* Testimonial Active Slide */}
          <div ref={testimonialRef} className="space-y-6 relative z-10">
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(reviews[activeIndex].stars)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>

            {/* Content Text */}
            <p className="text-base sm:text-lg text-text-primary font-medium italic leading-relaxed">
              "{reviews[activeIndex].content}"
            </p>

            {/* Author Details */}
            <div className="pt-4 border-t border-border-color/50">
              <h4 className="text-sm font-extrabold text-text-primary">
                {reviews[activeIndex].name}
              </h4>
              <p className="text-xs text-text-secondary font-semibold">
                {reviews[activeIndex].role}
              </p>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-between items-center mt-10">
            {/* Slide dots */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-8 bg-primary" : "w-2.5 bg-border-color hover:bg-text-secondary/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-xl border border-border-color hover:bg-bg-secondary text-text-secondary hover:text-primary transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-xl border border-border-color hover:bg-bg-secondary text-text-secondary hover:text-primary transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
