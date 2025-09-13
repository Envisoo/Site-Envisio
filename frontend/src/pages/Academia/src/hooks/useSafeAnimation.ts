import { useState, useEffect } from "react";

export function useSafeAnimation(delay = 0) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return shouldAnimate;
} 