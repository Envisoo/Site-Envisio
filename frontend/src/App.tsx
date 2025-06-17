/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuemSomos from "./pages/Quem_Somos";
import Servicos from "./pages/Servicos";
import Footer from "./components/Footer";
import RentingSection from "./serviços/RentingSection";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
