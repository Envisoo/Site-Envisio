/** @format */
import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

// Tipos
type Duration = "36" | "48" | "60";
type PackageType = "small" | "medium" | "large";

interface Package {
  name: string;
  pages: string;
  price: {
    [key in Duration]: number;
  };
}

const BizhubC250i: React.FC = () => {
  // Estados
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("small");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("36");

  // Constantes
  const EUR_TO_AOA = 1068.58;

  // Dados dos pacotes
  const packages: Record<PackageType, Package> = {
    small: {
      name: "RelaxRate Pequeno",
      pages: "500 Preto e Branco + 500 Cor páginas",
      price: {
        "36": 162.57,
        "48": 155.44,
        "60": 150.21,
      },
    },
    medium: {
      name: "RelaxRate Médio",
      pages: "1000 Preto e Branco + 1000 Cor páginas",
      price: {
        "36": 185.23,
        "48": 177.15,
        "60": 171.42,
      },
    },
    large: {
      name: "RelaxRate Grande",
      pages: "3000 Preto e Branco + 1500 Cor páginas",
      price: {
        "36": 210.45,
        "48": 201.33,
        "60": 194.76,
      },
    },
  };

  // Imagens do carrossel
  const images = [
    "https://www.konicaminolta.pt/shop/assets/media/ebizshopbpt/products/machines/bizhub%20c250i%20basic/images/bizhub-c250i-df-632-dk-516-studio-picture-front.jpg",
    "https://www.konicaminolta.pt/shop/assets/media/ebizshopbpt/products/machines/bizhub%20c250i%20basic/images/bizhub-c250i-df-632-dk-516-studio-picture-front.jpg",
    "https://www.konicaminolta.pt/shop/assets/media/ebizshopbpt/products/machines/bizhub%20c250i%20basic/images/bizhub-c250i-df-632-dk-516-studio-picture-front.jpg",
  ];

  // Funções de navegação do carrossel
  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Função de formatação
  const formatKwanza = useCallback((value: number): string => {
    return new Intl.NumberFormat("pt-AO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }, []);

  // Calcula o preço atual em Kwanza
  const getCurrentPrice = useCallback((): string => {
    const priceInEUR = packages[selectedPackage].price[selectedDuration];
    const priceInKwanza = priceInEUR * EUR_TO_AOA;
    return formatKwanza(priceInKwanza);
  }, [selectedPackage, selectedDuration, formatKwanza]);

  // Manipuladores de eventos
  const handlePackageChange = useCallback((pkg: PackageType) => {
    setSelectedPackage(pkg);
  }, []);

  const handleDurationChange = useCallback((duration: Duration) => {
    setSelectedDuration(duration);
  }, []);

  // Preço formatado para exibição
  const currentPrice = getCurrentPrice();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-[40%_60%] gap-8">
        {/* Coluna Esquerda - Carrossel de Imagens */}
        <div>
          <div className="relative bg-gray-50 rounded-lg border border-gray-200 mb-4 overflow-hidden">
            <div className="relative aspect-square flex items-center justify-center p-8">
              <img
                src={images[currentImage]}
                alt="bizhub C250i"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                type="button">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                type="button">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`flex-1 border-2 rounded-lg overflow-hidden transition-all ${
                  currentImage === idx ? "border-blue-600" : "border-gray-200"
                }`}
                type="button">
                <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center">
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Coluna Direita - Informações do Produto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            bizhub C301i - Impressora Multifunções A3
          </h1>
          <p className="text-gray-700 mb-4">
            Impressora multifunções a cores A3; formatos de papel A6-A4/ A3;
            cópia, impressão, digitalização; painel de utilizador tipo tablet.
          </p>

          {/* Card de Preços */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Alugue uma impressora
              </h2>
            </div>

            <div className="bg-white p-6">
              <p className="text-sm text-gray-700 mb-6">
                Pague uma taxa fixa mensal, incluindo serviços.
              </p>

              {/* Preço Atual */}
              <div className="text-right mb-6">
                <div className="text-3xl font-bold text-red-600">
                  {currentPrice} Kz
                </div>
                <div className="text-sm text-gray-600">(sem IVA) / mês</div>
              </div>

              {/* Seleção de Pacote */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Selecione o pacote de aluguer:
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {(Object.entries(packages) as [PackageType, Package][]).map(
                    ([pkgKey, pkg]) => {
                      const isSelected = selectedPackage === pkgKey;
                      const price = formatKwanza(
                        pkg.price[selectedDuration] * EUR_TO_AOA
                      );

                      return (
                        <button
                          key={pkgKey}
                          onClick={() => handlePackageChange(pkgKey)}
                          className={`border-2 rounded-lg p-4 text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-red-600 bg-red-50 shadow-sm"
                              : "border-gray-300 hover:border-red-400"
                          }`}
                          type="button">
                          <div className="font-bold text-sm mb-2 text-gray-900">
                            {pkg.name}
                          </div>
                          <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                            {pkg.pages}
                          </div>
                          <div className="font-semibold text-gray-700 text-sm">
                            {price} Kz / mês
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Duração do Contrato */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Selecione a duração do contrato:
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(["36", "48", "60"] as Duration[]).map((duration) => {
                    const isSelected = selectedDuration === duration;
                    return (
                      <button
                        key={duration}
                        onClick={() =>
                          handleDurationChange(duration as Duration)
                        }
                        className={`border-2 rounded-lg py-3 px-4 text-center font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "border-red-600 bg-red-50 text-red-600"
                            : "border-gray-300 hover:border-red-400 text-gray-700"
                        }`}
                        type="button">
                        por {duration} meses
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Benefícios */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    O que está incluído:
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Toners gratuitos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Entrega automática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Reparações incluídas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Serviço em 24 horas</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                type="button">
                Enviar solicitação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizhubC250i;
