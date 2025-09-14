/** @format */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Academia = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateClock = () => setCurrentTime(new Date());
    updateClock(); // Update immediately
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <section className="bg-gray-50">
      <div className="relative">
        {/* Full-screen banner */}
        <div>
          <picture>
            <source media="(min-width: 768px)" srcSet="/academia/banner.webp" />
            <img
              src="/academia/banner.webp"
              alt="Banner Academia Envisio"
              className="w-full h-[415px] object-cover"
            />
          </picture>

          {/* Rotating element with date and time */}
          <div className="absolute bottom-0 left-0 right-0 py-6 ">
            <div className="container mx-auto px-2">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  className="w-12 h-12 md:w-12 md:h-12 lg:w-20 lg:h-20  p-1 md:p-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c53535"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full drop-shadow-glow">
                    <defs>
                      <linearGradient
                        id="gearGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#dbd1d1" />
                      </linearGradient>
                      <filter
                        id="glow"
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite
                          in="SourceGraphic"
                          in2="blur"
                          operator="over"
                        />
                      </filter>
                    </defs>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.72l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.74l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.72l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.74l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.72V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-center">
                  <p className="text-red-700 text-sm md:text-base font-medium ">
                    {formatDate(currentTime)}
                  </p>
                  <p className="text-red-700 text-xl md:text-2xl font-bold mb-10">
                    {formatTime(currentTime)
                      .split(":")
                      .map((part, index, array) => (
                        <motion.span
                          key={index}
                          className="inline-block min-w-[1.5em] text-center relative"
                          initial={{ scale: 1 }}
                          whileHover={{
                            scale: 1.1,
                            textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}>
                          <span className="relative z-10">{part}</span>
                          {index < array.length - 1 && (
                            <span className="opacity-70">:</span>
                          )}
                          <span className="absolute inset-0 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </motion.span>
                      ))}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academia;
