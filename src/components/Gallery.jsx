"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import imagesData from "../data/images-data.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const gridRef = useRef(null);
  const titleRef = useRef(null);

  // Swipe gesture variables
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Set up entry scroll trigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, titleRef);

    return () => ctx.revert();
  }, []);

  // Trigger grid stagger when gallery expands or filters change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".gallery-card");
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [showAll, filter]);

  // Handle Image load status to trigger animations and remove skeletons
  const handleImageLoad = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  // Filter logic
  const filteredImages = imagesData.filter((img) => {
    if (filter === "all") return true;
    return img.category === filter;
  });

  // Homepage preview contains: 2 exterior, 2 room, 2 facility
  const previewImages = [
    imagesData.find(img => img.category === "exterior"),
    imagesData.find(img => img.category === "room"),
    imagesData.find(img => img.category === "facility"),
    imagesData.filter(img => img.category === "exterior")[1],
    imagesData.filter(img => img.category === "room")[1],
    imagesData.filter(img => img.category === "facility")[1],
  ].filter(Boolean);

  const displayImages = showAll ? filteredImages : previewImages;

  // Lightbox handlers
  const openLightbox = (src) => {
    const index = imagesData.findIndex((img) => img.src === src);
    setLightboxIndex(index);
    document.body.style.overflow = "hidden"; // Lock scroll
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = ""; // Unlock scroll
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % imagesData.length);
  };

  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + imagesData.length) % imagesData.length);
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const threshold = 50; // pixels
    const diff = touchStartX.current - touchEndX.current;
    
    if (diff > threshold) {
      // Swiped left -> Next image
      nextLightboxImage();
    } else if (diff < -threshold) {
      // Swiped right -> Previous image
      prevLightboxImage();
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "exterior", label: "Building Exterior" },
    { value: "room", label: "Room Interiors" },
    { value: "facility", label: "Facilities" },
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            Visual Tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
            Explore Sadguru Krupa PG
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Take a high-quality visual walkthrough of our spaces, dining setup, co-working lounges, laundry area, and exterior.
          </p>
        </div>

        {/* Filters - only visible in ShowAll mode */}
        {showAll && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-text-secondary mr-2">
              <Filter size={12} />
              Filter By:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all border duration-200 cursor-pointer ${
                  filter === cat.value
                    ? "bg-primary border-primary text-white shadow-premium"
                    : "bg-bg-primary border-border-color/60 text-text-secondary hover:text-primary hover:border-primary/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              onClick={() => openLightbox(img.src)}
              className="gallery-card group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-bg-primary border border-border-color/50 cursor-pointer shadow-premium hover:shadow-premium-lg transition-all duration-300"
            >
              {/* Image Loader Skeleton */}
              {!loadedImages[img.src] && (
                <div className="absolute inset-0 bg-border-color/40 animate-pulse flex items-center justify-center text-text-secondary">
                  <ImageIcon size={32} className="opacity-30" />
                </div>
              )}

              {/* Image Element */}
              <img
                src={img.src}
                alt={img.title}
                onLoad={() => handleImageLoad(img.src)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
                  loadedImages[img.src] ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />

              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <div className="flex justify-between items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold bg-black/40 px-2 py-0.5 rounded">
                      {img.category === "exterior" ? "Exterior" : img.category === "room" ? "Interior" : "Facility"}
                    </span>
                    <h4 className="text-sm font-extrabold mt-1 font-heading !text-white">
                      {img.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow">
                    <ZoomIn size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Toggle Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setShowAll(!showAll);
              if (showAll) {
                // Scroll back to gallery top smoothly
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3.5 rounded-2xl bg-bg-primary hover:bg-bg-secondary border border-border-color text-text-primary text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-premium active:scale-95 cursor-pointer"
          >
            {showAll ? "Show Featured Preview" : "View Full Gallery (20 Photos)"}
          </button>
        </div>

      </div>

      {/* Immersive Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all">
          
          {/* Close Area */}
          <div className="absolute inset-0" onClick={closeLightbox} />

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevLightboxImage}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextLightboxImage}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image Presenter */}
          <div
            className="relative max-w-5xl max-h-[80vh] px-10 flex flex-col items-center justify-center z-40 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={imagesData[lightboxIndex].src}
              alt={imagesData[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            
            {/* Title and details panel */}
            <div className="mt-4 text-center text-white space-y-1">
              <h3 className="text-lg font-extrabold font-heading">
                {imagesData[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-400 capitalize">
                Category: {imagesData[lightboxIndex].category} ({lightboxIndex + 1} of {imagesData.length})
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
