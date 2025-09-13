/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola suavemente para o topo ao trocar de rota
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
