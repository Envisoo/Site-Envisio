/** @format */

import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function OptimizedImage({ src, alt, className }: OptimizedImageProps) {
  const [carregando, setCarregando] = useState(true);
  const nomeBase = src.replace(/\.[^/.]+$/, "");

  return (
    <div className={`relative ${className}`}>
      {carregando && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet={`${nomeBase}-extraGrande.webp`}
        />
        <source media="(min-width: 768px)" srcSet={`${nomeBase}-grande.webp`} />
        <source media="(min-width: 320px)" srcSet={`${nomeBase}-medio.webp`} />
        <img
          src={`${nomeBase}-pequeno.webp`}
          alt={alt}
          loading="lazy"
          onLoad={() => setCarregando(false)}
          className={`${className} ${
            carregando ? "opacity-0" : "opacity-100"
          } transition-opacity`}
        />
      </picture>
    </div>
  );
}
