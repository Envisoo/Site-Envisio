/** @format */

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import RentingFeaturesPanel from "../components/RentingFeaturesPanel";

type Impressora = {
  id: string;
  nome: string;
  imagem: string;
  descricao: string;
  especificacoes: string[];
  preco: {
    [key: string]: { [key: string]: number };
  };
  pacotes: {
    [key: string]: string;
  };
};

const BizhubRental = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [selectedPackage, setSelectedPackage] = useState<string>("standard");
  const [selectedDuration, setSelectedDuration] = useState<string>("36");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [impressoraSelecionada, setImpressoraSelecionada] =
    useState<string>("bizhub-c301i");

  const impressoras: { [key: string]: Impressora } = {
    "bizhub-c301i": {
      id: "bizhub-c301i",
      nome: "bizhub C301i",
      imagem: "/images/impressoras/bizhub-c301i.jpg",
      descricao:
        'Impressora multifunções a cores A3; formatos de papel A6-A3; cópia, impressão, digitalização; tela touchscreen 10.1";',
      especificacoes: [
        "A3",
        "Cor",
        "Cópia",
        "Digitalização",
        "Impressão automática nos 2 lados",
        "Digitalização automática nos 2 lados",
        "WiFi",
        'Tela touchscreen 10.1"',
        "Segurança Bitdefender",
      ],
      preco: {
        standard: {
          "24": 315000.0,
          "36": 285000.0,
          "48": 268000.0,
        },
        premium: {
          "24": 360000.0,
          "36": 325000.0,
          "48": 330000.0,
        },
      },
      pacotes: {
        standard: "3000 Preto e Branco + 750 Cor páginas",
        premium: "4000 Preto e Branco + 1000 Cor páginas",
      },
    },
    "bizhub-4051i": {
      id: "bizhub-4051i",
      nome: "bizhub 4051i",
      imagem: "/images/impressoras/bizhub-4051i.jpg",
      descricao:
        "Impressora multifunções a cores A3; formatos de papel A6-A3; cópia, impressão, digitalização; alta produtividade;",
      especificacoes: [
        "A3",
        "Cor",
        "Cópia",
        "Digitalização",
        "Até 40 ppm",
        'Tela touchscreen 10.1"',
        "WiFi",
        "Segurança avançada",
      ],
      preco: {
        light: {
          "24": 220000.0,
          "36": 200000.0,
          "48": 185000.0,
        },
        basic: {
          "24": 245000.0,
          "36": 220000.0,
          "48": 205000.0,
        },
      },
      pacotes: {
        light: "1000 Preto e Branco páginas",
        basic: "1700 Preto e Branco páginas",
      },
    },
  };

  const impressoraAtual = impressoras[impressoraSelecionada];
  const pacoteKeys = Object.keys(impressoraAtual.pacotes);

  const imagensPorImpressora = {
    "bizhub-c301i": [
      "/images/renting/c301i/1.webp",
      "/images/renting/c301i/2.webp",
      "/images/renting/c301i/3.webp",
      "/images/renting/c301i/4.webp",
      "/images/renting/c301i/5.webp",
      "/images/renting/c301i/6.webp",
      "/images/renting/c301i/7.webp",
    ],
    "bizhub-4051i": [
      "/images/renting/4051i/1.webp",
      "/images/renting/4051i/2.webp",
      "/images/renting/4051i/3.webp",
      "/images/renting/4051i/4.webp",
      "/images/renting/4051i/5.webp",
      "/images/renting/4051i/6.webp",
    ],
  };

  const images =
    imagensPorImpressora[
      impressoraSelecionada as keyof typeof imagensPorImpressora
    ] || [];

  const formatKwanza = (value: number): string => {
    return new Intl.NumberFormat("pt-AO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getCurrentPrice = (): number => {
    return impressoraAtual.preco[selectedPackage][selectedDuration];
  };

  const getPacoteLabel = (key: string): string => {
    if (key === "standard") return "Pacote Standard";
    if (key === "premium") return "Pacote Premium";
    if (key === "light") return "Pacote Light";
    if (key === "basic") return "Pacote Basic";
    return key;
  };

  const nextImage = (): void => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (): void => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um endereço de email válido.");
      setLoading(false);
      return;
    }

    try {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "" });

      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setError(
        "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-20">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          type="button">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        {/* Seletor de Modelos */}
        <div className="bg-gray-50 py-6 px-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            Selecione o modelo de impressora
          </h2>
          <div className="flex flex-wrap gap-4">
            {Object.values(impressoras).map((impressora) => (
              <button
                key={impressora.id}
                onClick={() => {
                  setImpressoraSelecionada(impressora.id);
                  setSelectedPackage(Object.keys(impressora.pacotes)[0]);
                  setCurrentImage(0);
                }}
                className={`px-6 py-3 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transition-colors ${
                  impressoraSelecionada === impressora.id
                    ? "text-red-600 after:bg-red-600 bg-gradient-to-t from-red-50 to-transparent"
                    : "text-gray-800 hover:text-gray-900 after:bg-transparent hover:after:bg-gray-300"
                }`}>
                {impressora.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[40%_60%] gap-8">
          {/* Coluna Esquerda - Carrossel de Imagens */}
          <div>
            <div className="relative bg-white border border-gray-200 mb-4 overflow-hidden">
              <div className="relative aspect-square flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt={`${impressoraAtual.nome} - Imagem ${currentImage + 1}`}
                    className="absolute max-w-full max-h-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Indicadores de navegação */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImage ? "bg-white w-6" : "bg-white"
                      }`}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Botões de navegação */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-10"
                      type="button"
                      aria-label="Imagem anterior">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg z-10"
                      type="button"
                      aria-label="Próxima imagem">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-1 border-2 overflow-hidden transition-all ${
                    currentImage === index
                      ? "border-red-600"
                      : "border-gray-200"
                  }`}
                  type="button">
                  <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
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
              {impressoraAtual.nome} - Impressora Multifunções A3
            </h1>

            <p className="text-gray-700 mb-4">{impressoraAtual.descricao}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {impressoraAtual.especificacoes.map((espec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded border">
                  {espec}
                </span>
              ))}
            </div>

            <div className="border-2 border-gray-300 overflow-hidden mb-6">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Alugue uma impressora
                </h2>
              </div>

              <div className="bg-white p-6">
                <p className="text-sm text-gray-700 mb-6">
                  Pague uma taxa fixa mensal, incluindo serviços.
                </p>

                <div className="text-right mb-6">
                  <div className="text-3xl font-bold text-red-600">
                    {formatKwanza(getCurrentPrice())} Kz
                  </div>
                  <div className="text-sm text-gray-600">(sem IVA) / mês</div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Selecione o pacote de aluguer:
                    </label>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      pacoteKeys.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    }`}>
                    {pacoteKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPackage(key)}
                        className={`border-2 p-4 text-left transition-all cursor-pointer ${
                          selectedPackage === key
                            ? "border-red-600 bg-red-50 shadow-sm"
                            : "border-gray-300 hover:border-red-400"
                        }`}
                        type="button">
                        <div className="font-bold text-sm mb-2 text-gray-900">
                          {getPacoteLabel(key)}
                        </div>
                        <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                          {impressoraAtual.pacotes[key]}
                        </div>
                        <div className="font-semibold text-gray-700 text-sm">
                          {formatKwanza(
                            impressoraAtual.preco[key][selectedDuration]
                          )}{" "}
                          Kz / mês
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Selecione a duração do contrato:
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["24", "36", "48"].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={`border-2 py-3 px-4 text-center font-semibold transition-all cursor-pointer ${
                          selectedDuration === duration
                            ? "border-red-600 bg-red-50 text-red-600"
                            : "border-gray-300 hover:border-red-400 text-gray-700"
                        }`}
                        type="button">
                        por {duration} meses
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold text-lg transition-colors"
                  type="button">
                  Enviar solicitação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowForm(false);
                setError("");
                setSuccess(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Solicitar Orçamento</h2>

            {error && (
              <div className="p-4 rounded-lg bg-red-100 text-red-800 mb-4">
                {error}
              </div>
            )}
            {success ? (
              <div className="p-4 rounded-lg bg-green-100 text-green-800 mb-4">
                Solicitação enviada com sucesso! Entraremos em contato em breve.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="pt-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Resumo do Orçamento
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Modelo: {impressoraAtual.nome}</p>
                      <p>Pacote: {getPacoteLabel(selectedPackage)}</p>
                      <p>Duração: {selectedDuration} meses</p>
                      <p className="font-medium mt-2">
                        Valor mensal: {formatKwanza(getCurrentPrice())} Kz
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Solicitação"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <RentingFeaturesPanel tipo={impressoraSelecionada} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizhubRental;
