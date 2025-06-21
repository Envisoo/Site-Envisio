/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuemSomos from "./pages/Quem_Somos";
import Servicos from "./pages/Servicos";
import Footer from "./components/Footer";
import RentingSection from "./serviços/RentingSection";
import Contato from "./pages/Contato";
import SuporteTecnico from "./pages/SuporteTecnico";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />{" "}
        {/* Corrigido o path */}
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/renting" element={<RentingSection />} />
        <Route path="/pages/contato" element={<Contato />} />
        <Route path="/pages/suporte-tecnico" element={<SuporteTecnico />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
