/**
 * eslint-disable react/jsx-no-undef
 *
 * @format
 */

/** @format */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import QuemSomos from "./pages/Quem_Somos";
import Footer from "./components/Footer";
import RentingSection from "./serviços/RentingSection";
import Contato from "./pages/Contato";
import SuporteTecnico from "./pages/SuporteTecnico";
import ServicosHardware from "./serviços/ServicosHardware";
import ServicosSoftware from "./serviços/ServicosSoftware";
import ScrollToTop from "./components/ScrollToTop";

import QuemSomosMobile from "./pages/mobile/QuemSomosMobile";
import { useWindowSize } from "./hooks/useWindowSize";
import ServicosHardwareMobile from "./pages/mobile/ServicosHardwareMobile";
import ServicosSoftwareMobile from "./pages/mobile/ServicosSoftwareMobile";
import RentingMobile from "./pages/mobile/RentingMobile";
import BizhubC250iPage from "./pages/BizhubC250iPage";

// Rotas da Academia
import { AuthProvider } from "./pages/Academia/src/contextos/AuthContext";
import RotasAcademia from "./pages/Academia/src/rotas/RotasAcademia";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

export function App() {
  const { isMobile } = useWindowSize();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <HelmetProvider>
          <AuthProvider>
            <ScrollToTop />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Routes>
              {/* Rotas do site principal */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contato"
                element={
                  <>
                    <Navbar />
                    <Contato />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/quem-somos"
                element={
                  <>
                    <Navbar />
                    {isMobile ? <QuemSomosMobile /> : <QuemSomos />}
                    <Footer />
                  </>
                }
              />
              <Route
                path="/suporte-tecnico"
                element={
                  <>
                    <Navbar />
                    <SuporteTecnico />
                    <Footer />
                  </>
                }
              />

              {/* Rotas da Academia - Com layout próprio */}
              <Route path="/academia/*" element={<RotasAcademia />} />

              {/* Outras rotas existentes */}
              <Route
                path="/servicos/renting"
                element={
                  <>
                    <Navbar />
                    {isMobile ? <RentingMobile /> : <RentingSection />}
                    <Footer />
                  </>
                }
              />
              <Route
                path="/servicos/hardware"
                element={
                  <>
                    <Navbar />
                    {isMobile ? (
                      <ServicosHardwareMobile />
                    ) : (
                      <ServicosHardware />
                    )}
                    <Footer />
                  </>
                }
              />

              <Route
                path="/servicos/software"
                element={
                  <>
                    <Navbar />
                    {isMobile ? (
                      <ServicosSoftwareMobile />
                    ) : (
                      <ServicosSoftware />
                    )}
                    <Footer />
                  </>
                }
              />
              <Route
                path="/bizhub-c250i"
                element={
                  <>
                    <Navbar />
                    <BizhubC250iPage />
                    <Footer />
                  </>
                }
              />

              {/* Rota de fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
