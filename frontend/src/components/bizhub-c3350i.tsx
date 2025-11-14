/** @format */

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check, HelpCircle } from "lucide-react";

const BizhubC3350i: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("small");
  const [selectedDuration, setSelectedDuration] = useState("36");

  // Taxa de conversão EUR para AOA (Kwanza Angolano)
  const EUR_TO_AOA = 1068.58;

  // Preços base em EUR por pacote e duração
  const pricing = {
    small: {
      "36": 200.0,
      "48": 190.0,
      "60": 180.0,
    },
    medium: {
      "36": 225.0,
      "48": 215.0,
      "60": 205.0,
    },
    large: {
      "36": 260.0,
      "48": 250.0,
      "60": 240.0,
    },
  };

  const packages = {
    small: {
      name: "RelaxRate Small",
      pages: "1000 Preto e Branco + 500 Cor páginas",
    },
    medium: {
      name: "RelaxRate Medium",
      pages: "2000 Preto e Branco + 1000 Cor páginas",
    },
    large: {
      name: "RelaxRate Large",
      pages: "4000 Preto e Branco + 2000 Cor páginas",
    },
  };

  const getCurrentPrice = () => {
    return pricing[selectedPackage as keyof typeof pricing][
      selectedDuration as keyof typeof pricing.small
    ];
  };

  const priceInAOA = (price: number) => {
    return (price * EUR_TO_AOA).toFixed(2);
  };

  const images = [
    "/images/printers/bizhub-c3350i-1.jpg",
    "/images/printers/bizhub-c3350i-2.jpg",
    "/images/printers/bizhub-c3350i-3.jpg",
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[40%_60%] gap-8">
          {/* Coluna Esquerda - Carrossel de Imagens */}
          <div>
            {/* Carrossel Principal */}
            <div className="relative bg-gray-50 rounded-lg border border-gray-200 mb-4 overflow-hidden">
              <div className="relative aspect-square flex items-center justify-center p-8">
                <img
                  src={images[currentImage]}
                  alt="bizhub C3350i"
                  className="max-w-full max-h-full object-contain"
                />

                {/* Botões de Navegação */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                    currentImage === index
                      ? "border-red-500"
                      : "border-transparent"
                  }`}>
                  <img
                    src={img}
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Coluna Direita - Informações e Formulário */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Konica Minolta bizhub C3350i
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Impressora a cores de alto desempenho para escritórios exigentes
              </p>
            </div>

            {/* Seção de Pacotes */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Selecione o Pacote</h2>
              <div className="space-y-3">
                {Object.entries(packages).map(([key, pkg]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedPackage(key)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPackage === key
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{pkg.name}</h3>
                        <p className="text-sm text-gray-600">{pkg.pages}</p>
                      </div>
                      {selectedPackage === key && (
                        <Check className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Duração do Contrato */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Duração do Contrato
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[36, 48, 60].map((months) => (
                    <div
                      key={months}
                      onClick={() => setSelectedDuration(months.toString())}
                      className={`p-4 text-center border rounded-lg cursor-pointer transition-colors ${
                        selectedDuration === months.toString()
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}>
                      <div className="font-medium">{months} meses</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo do Preço */}
              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Preço Mensal:</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">
                      {getCurrentPrice().toFixed(2)} €
                    </div>
                    <div className="text-sm text-gray-500">
                      ≈ {priceInAOA(getCurrentPrice())} AOA
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Solicitar Orçamento
                </button>
              </div>
            </div>

            {/* Especificações Técnicas */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">
                Especificações Técnicas
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Impressão</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Velocidade: Até 35/33 ppm (A4/A3)</li>
                    <li>• Resolução: 1.200 x 1.200 dpi</li>
                    <li>• Primeira saída: A partir de 5.2 segundos</li>
                    <li>• Capacidade do papel: Até 3.650 folhas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Cópia</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Velocidade: Até 35/33 cpm (A4/A3)</li>
                    <li>• Redução/Ampliação: 25% a 400%</li>
                    <li>• Cópias: 1-999 cópias</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Digitalização</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>
                      • Velocidade: Até 120/60 ipm (A4, preto e branco/cor)
                    </li>
                    <li>• Resolução: Máx. 600 x 600 dpi</li>
                    <li>• Formatos: PDF, JPEG, TIFF, XPS, etc.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizhubC3350i;
