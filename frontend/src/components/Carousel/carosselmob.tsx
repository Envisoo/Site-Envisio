/** @format */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

interface CarouselProps {
  slides: {
    srcMobile: string;
    link: string;
    label: string;
  }[];
}

export const MobileCarousel = ({ slides }: CarouselProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] w-full flex items-center justify-center overflow-hidden md:hidden z-10">
      {/* Botão Anterior */}
      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        }}
        onTouchEnd={() => setIsPaused(false)}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/50 backdrop-blur-sm"
        aria-label="Anterior">
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white w-4 h-4 sm:w-5 sm:h-5">
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-full h-full">
          <img
            src={slides[carouselIndex].srcMobile}
            alt={slides[carouselIndex].label}
            className="w-full h-full object-cover"
          />

          {/* Conteúdo e botão reposicionado */}
          <div className="absolute bottom-2 sm:bottom-3 left-2 right-2 sm:left-3 sm:right-3">
            <button
              onClick={() => navigate(slides[carouselIndex].link)}
              className="w-28 sm:w-32 bg-red-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-[5px] text-xs sm:text-sm font-semibold hover:bg-red-700 transition-colors">
              Saiba mais
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botão Próximo */}
      <button
        onClick={() => {
          setIsPaused(true);
          setCarouselIndex((prev) => (prev + 1) % slides.length);
        }}
        onTouchEnd={() => setIsPaused(false)}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/50 backdrop-blur-sm"
        aria-label="Próximo">
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white w-4 h-4 sm:w-5 sm:h-5">
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
