/** @format */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { partners } from "../types/partners";

const LOGOS_PER_VIEW = 4;
const AUTO_SCROLL_INTERVAL = 2500; // ms

const PartnersCarousel = () => {
  const [start, setStart] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStart((prev) => (prev + 1) % partners.length);
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [start]);

  // Responsivo: ajusta logos por view em telas menores
  const [logosPerView, setLogosPerView] = useState(LOGOS_PER_VIEW);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setLogosPerView(1);
      else if (window.innerWidth < 900) setLogosPerView(2);
      else if (window.innerWidth < 1200) setLogosPerView(3);
      else setLogosPerView(LOGOS_PER_VIEW);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gera as logos visíveis
  const visible = [];
  for (let i = 0; i < logosPerView; i++) {
    visible.push(partners[(start + i) % partners.length]);
  }

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm uppercase tracking-wider text-gray-500 mb-4 block">
            Parcerias Estratégicas
          </span>
          <h2 className="text-4xl font-bold mb-6">Nossos Parceiros</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8" />
          <p className="text-xl text-gray-600">
            Colaboramos com as principais empresas do mercado para oferecer as
            melhores soluções
          </p>
        </motion.div>

        {/* Carrossel de Logos */}
        <div className="flex justify-center items-center gap-16 py-8 transition-all duration-500">
          {visible.map((partner) => (
            <div key={partner.id} className="flex items-center">
              <img
                src={partner.imageUrl}
                alt={partner.name}
                className="h-20 w-auto object-contain"
                style={{ maxWidth: 180 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
