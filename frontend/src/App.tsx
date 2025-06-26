/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuemSomos from "./pages/Quem_Somos";
import Footer from "./components/Footer";
import RentingSection from "./serviços/RentingSection";
import Contato from "./pages/Contato";
import SuporteTecnico from "./pages/SuporteTecnico";
import ServicosHardware from "./serviços/ServicosHardware";
import ServicosSoftware from "./serviços/ServicosSoftware";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />{" "}
        <Route path="/servicos/renting" element={<RentingSection />} />
        <Route path="/pages/contato" element={<Contato />} />
        <Route path="/pages/suporte-tecnico" element={<SuporteTecnico />} />
        <Route path="/servicos/hardware" element={<ServicosHardware />} />
        <Route path="/servicos/software" element={<ServicosSoftware />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
