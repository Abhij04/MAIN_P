"use client";

import { useState } from "react";
import { Phone, MessageSquare, MapPin, Mail, Navigation, Landmark, Building2, ShoppingBag, Utensils, ShieldAlert } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    occupancy: "Single Occupancy Room",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert("Please enter your name and mobile number.");
      return;
    }

    setIsSubmitting(true);

    // GOOGLE SHEETS APPS SCRIPT WEB APP ENDPOINT URL
    // Replace the URL placeholder below with your deployed Web App URL
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxT45Xd-M3hGi2rLtUOdnXUOaTG2FB2txmzXvaPILMdcrRFf-_TO20_eaama0dUMRfP/exec";

    try {
      if (GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL.startsWith("https://")) {
        await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          mode: "no-cors", // Bypasses CORS preflight headers
          headers: {
            "Content-Type": "text/plain", // plain text avoids CORS preflight checks in script Web Apps
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Fallback testing simulation
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        occupancy: "Single Occupancy Room",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry to Google Sheets:", error);
      alert("Something went wrong during submission. Please try contacting the owner directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "919112669054";
  const whatsappMsg = encodeURIComponent(
    "Hello, I am interested in accommodation at Sadguru Krupa Apartments & PG. Please share room availability and pricing."
  );

  const landmarks = [
    { name: "MIT ADT Rajbaug Campus", distance: "200 meters (1 Min Walk)", icon: <Landmark size={14} /> },
    { name: "Restaurants & Mess Halls", distance: "100-200 meters", icon: <Utensils size={14} /> },
    { name: "Supermarkets & Shops", distance: "150 meters", icon: <ShoppingBag size={14} /> },
    { name: "Loni Kalbhor Bus Station", distance: "400 meters", icon: <Building2 size={14} /> },
    { name: "Local Clinic / Pharmacy", distance: "300 meters", icon: <ShieldAlert size={14} /> },
  ];

  return (
    <section id="contact" className="py-24 bg-bg-secondary border-t border-border-color/30">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
            Contact Owner & Inquire
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Ready to secure your room? Reach out to the owner directly via Call or WhatsApp, or fill out the availability form.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side: Contact Info, Map, Landmarks (7 cols) */}
          <div className="lg:col-span-7 space-y-8">

            {/* Quick Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Address Card */}
              <div className="p-6 bg-bg-primary border border-border-color/50 rounded-2xl shadow-premium">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <MapPin size={20} />
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-text-primary mb-2">
                  Our Address
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-semibold">
                  Sadguru Krupa Apartments & PG<br />
                  Near MIT ADT Rajbaug Campus,<br />
                  Loni Kalbhor, Solapur Highway,<br />
                  Pune - 412201
                </p>
              </div>

              {/* Call Card */}
              <div className="p-6 bg-bg-primary border border-border-color/50 rounded-2xl shadow-premium flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Phone size={20} />
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-text-primary mb-2">
                    Direct Call
                  </h3>
                  <div className="space-y-1 text-xs sm:text-sm font-extrabold text-text-primary">
                    <a href="tel:+919112669054" className="block hover:text-primary transition-colors">
                      +91 9112669054
                    </a>
                    <a href="tel:+917888225849" className="block hover:text-primary transition-colors">
                      +91 7888225849
                    </a>
                  </div>
                </div>
                <p className="text-[10px] text-text-secondary mt-3">
                  Available for inquiry: 9:00 AM - 9:00 PM
                </p>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a
                href="tel:+919112669054"
                className="py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-premium hover:shadow-premium-lg active:scale-95 transition-all text-center"
              >
                <Phone size={16} />
                <span>Call Owner</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-success text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-premium hover:shadow-premium-lg active:scale-95 transition-all text-center"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Owner</span>
              </a>

              <a
                href="https://maps.app.goo.gl/uRzHXsnnGm3EFy7P6"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-bg-primary border border-border-color text-text-primary font-bold text-xs flex flex-col items-center justify-center gap-1.5 hover:bg-bg-secondary active:scale-95 transition-all text-center"
              >
                <Navigation size={16} className="text-primary" />
                <span>Get Directions</span>
              </a>

              <a
                href="mailto:inquiry@sadgurupg.com?subject=Accommodation%20Inquiry%20-%20Sadguru%20Krupa"
                className="py-3 px-4 rounded-xl bg-bg-primary border border-border-color text-text-primary font-bold text-xs flex flex-col items-center justify-center gap-1.5 hover:bg-bg-secondary active:scale-95 transition-all text-center"
              >
                <Mail size={16} className="text-primary" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-80 rounded-3xl overflow-hidden border border-border-color/50 shadow-premium relative bg-bg-primary gmap_canvas">
              <iframe
                title="Google Maps Location for Sadguru Krupa PG"
                src="https://maps.google.com/maps?q=18.4875881,74.0226519&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Nearby Landmarks list */}
            <div className="p-6 bg-bg-primary border border-border-color/50 rounded-2xl shadow-premium">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-text-primary mb-4">
                Nearby Landmarks & Distance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landmarks.map((mark, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {mark.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-primary">
                        {mark.name}
                      </p>
                      <p className="text-[10px] text-text-secondary">
                        {mark.distance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Contact Availability Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-bg-primary border border-border-color/50 rounded-3xl p-8 shadow-premium relative">

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-text-primary font-heading">
                        Inquiry Form
                      </h3>
                      <p className="text-xs text-text-secondary leading-normal">
                        Fill out your requirements below, and our team will get in touch with you.
                      </p>
                    </div>

                    <hr className="border-border-color/50" />

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border border-border-color/60 bg-bg-secondary text-text-primary text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                        Mobile Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-border-color/60 bg-bg-secondary text-text-primary text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-xl border border-border-color/60 bg-bg-secondary text-text-primary text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Occupancy Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                        Preferred Occupancy <span className="text-primary">*</span>
                      </label>
                      <select
                        id="occupancy-select"
                        name="occupancy"
                        value={formData.occupancy}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border-color/60 bg-bg-secondary text-text-primary text-sm focus:border-primary focus:outline-none transition-colors"
                      >
                        <option>Single Occupancy Room</option>
                        <option>Double Occupancy Room</option>
                        <option>1BHK Flat</option>
                        <option>1RK Flat</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message-textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write details about your arrival date, course name, etc."
                        className="w-full px-4 py-3 rounded-xl border border-border-color/60 bg-bg-secondary text-text-primary text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-premium hover:shadow-premium-lg active:scale-[0.98] mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Inquiry...
                        </>
                      ) : (
                        "Request Room Availability"
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-text-primary font-heading">
                        Request Received!
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                        Thank you for your interest! The owner has been notified. We will call you back on your mobile number to discuss pricing and availability shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl border border-border-color text-text-primary text-xs font-bold hover:bg-bg-secondary transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
