"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/images/bg2.jpeg", "/images/bg3.jpeg"];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => nextSlide(1), 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = (dir) => {
    setCurrentIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="relative w-full max-w-7xl md:h-[70vh] h-[40vh] rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 bg-cover bg-center rounded-xl bg-blend-multiply"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white md:px-6 p-3 md:max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-semibold text-orange-600 mb-3">
            Bringing Local Flavors to Your Doorstep
          </h1>
          <p className="max-w-xl text-white/90 mb-6">
            Discover, order, and enjoy authentic local dishes from trusted restaurants around you —
            fresh, tasty, and made with love.
          </p>

          {/* Optional Buttons */}
          {/* <div className="sm:block hidden">
            <div className="flex md:flex-wrap flex-nowrap justify-center gap-4">
              <button className="rounded-full bg-orange-500 md:px-6 px-3 md:py-3 py-2 text-base font-medium shadow-lg hover:scale-105 transition-transform">
                Find Restaurants
              </button>
              <button className="rounded-full bg-white text-gray-800 px-6 md:py-3 py-2 text-base font-medium shadow-lg hover:scale-105 transition-transform">
                Order Now
              </button>
            </div>
          </div> */}
        </div>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={() => nextSlide(-1)}
            className="bg-white/60 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
          >
            ‹
          </button>
          <button
            onClick={() => nextSlide(1)}
            className="bg-white/60 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
