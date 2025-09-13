/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CarouselProps {
  slides: {
    src: string;
    link: string;
    label: string;
  }[];
}

export const DesktopCarousel = ({ slides }: CarouselProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <section className="relative px-4 md:px-6 lg:px-10 min-h-[40vh] md:min-h-[50vh] lg:min-h-[63vh] mt-[-20px] w-full flex items-center justify-center overflow-hidden hidden md:flex">
      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        }}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute left-2 md:left-4 lg:left-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 group"
        aria-label="Anterior">
        <svg
          width="20"
          height="20"
          className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={carouselIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full z-0">
          <img
            src={slides[carouselIndex].src}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{
              maxHeight: "calc(100vh - 64px)",
              height: "100%",
            }}
          />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-10 lg:left-10 z-20">
            <Link to={slides[carouselIndex].link}>
              <button
                className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-red-600 text-white rounded-[5px] text-sm md:text-base font-semibold shadow-lg hover:bg-red-700 transition-all"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}>
                Saiba mais
              </button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) => (prev + 1) % slides.length);
        }}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute right-2 md:right-4 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 group"
        aria-label="Próximo">
        <svg
          width="20"
          height="20"
          className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};
