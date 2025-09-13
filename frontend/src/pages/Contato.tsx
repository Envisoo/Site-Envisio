/** @format */

import React, { useState, useEffect, useRef } from "react";
import { enviarEmail } from "../services/email";
import "./Contato.css";

const Contato: React.FC = () => {
  // Ref para controlar se o componente está montado
  const isMountedRef = useRef(true);

  // Estados existentes
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipoCliente, setTipoCliente] = useState("singular");
  const [metodoComunicacao, setMetodoComunicacao] = useState("whatsapp");

  // Novo estado para controlar os campos do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    area: "",
    empresa: "",
    apelido: "",
    nif: "",
  });

  // Adicione estado de loading
  const [isLoading, setIsLoading] = useState(false);

  // Função para limpar o formulário
  const resetForm = () => {
    if (!isMountedRef.current) return;

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      area: "",
      empresa: "",
      apelido: "",
      nif: "",
    });
    setTipoCliente("singular");
    setMetodoComunicacao("whatsapp");
  };

  // Função para lidar com mudanças nos campos
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para enviar mensagem para o WhatsApp
  function handleWhatsAppSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isMountedRef.current) return;

    // Monta a mensagem
    const text =
      `Olá, meu nome é ${formData.name}%0A` +
      `E-mail: ${formData.email}%0A` +
      (formData.phone ? `Telefone: ${formData.phone}%0A` : "") +
      `Área de Interesse: ${formData.area}%0A` +
      `Mensagem: ${encodeURIComponent(formData.message)}`;

    // Número do WhatsApp da empresa
    const whatsappNumber = "244947137676";

    // Redireciona para o WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

    // Limpa o formulário
    setTimeout(() => {
      if (isMountedRef.current) {
        resetForm();
      }
    }, 100);
  }

  // useEffect para cleanup
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Função para enviar por email
  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting || !isMountedRef.current) {
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const response = await enviarEmail(formData, tipoCliente);

      if (isMountedRef.current) {
        if (response.success) {
          setFormSubmitted(true);
          resetForm();
        } else {
          throw new Error("Falha ao enviar email");
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        alert("Erro ao enviar mensagem. Tente novamente.");
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsSubmitting(false);
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📋 handleSubmit chamado");
    console.log("📞 Método de comunicação:", metodoComunicacao);

    if (metodoComunicacao === "whatsapp") {
      console.log("📱 Enviando via WhatsApp");
      handleWhatsAppSubmit(e);
    } else {
      console.log("📧 Enviando via Email");
      handleEmailSubmit(e);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12">
      {/* Seção de Informações */}
      <article aria-labelledby="contact-info-heading">
        <h1
          id="contact-info-heading"
          className="text-4xl font-semibold mb-6 text-red-700">
          Entre em Contato
        </h1>

        <p
          className="mb-8 text-lg text-gray-700 leading-relaxed"
          style={{ fontFamily: "Segoe UI Regular" }}>
          Tem alguma dúvida ou precisa de mais informações? Estamos aqui para
          ajudar!
        </p>

        <div className="mb-8 space-y-6">
          {/* WhatsApp */}
          <a
            href="https://wa.me/244947137676"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group hover:bg-green-50 rounded-[5px] px-4 py-3 transition-all duration-300 hover:shadow-md">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-[5px] bg-green-100 shadow-lg group-hover:bg-green-200 transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#25D366" />
                <path
                  d="M22.5 17.8c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a7.7 7.7 0 01-2.3-2.2c-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5s-.7-1.7-1-2.3c-.2-.5-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3a2.8 2.8 0 00-.9 2.1c0 1.2.8 2.4 1.1 2.8.3.4 2.1 3.3 5.1 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z"
                  fill="#fff"
                />
              </svg>
            </span>
            <div>
              <span
                className="block text-sm text-gray-500 "
                style={{ fontFamily: "Segoe UI Regular" }}>
                WhatsApp
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:geral@envisio.co.ao"
            className="flex items-center gap-4 group hover:bg-blue-50 rounded-[5px] px-4 py-3 transition-all duration-300 hover:shadow-md">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 shadow-lg group-hover:bg-blue-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </span>
            <div>
              <span
                className="block text-sm text-gray-500"
                style={{ fontFamily: "Segoe UI Regular" }}>
                E-mail
              </span>
              <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                geral@envisio.co.ao
              </span>
            </div>
          </a>

          {/* Endereço */}
          <a
            href="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group hover:bg-red-50 rounded-[5px] px-4 py-3 transition-all duration-300 hover:shadow-md">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-[5px] bg-red-100 text-red-600 shadow-lg group-hover:bg-red-200 mt-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <div>
              <span
                className="block text-sm text-gray-500"
                style={{ fontFamily: "Segoe UI Regular" }}>
                Endereço
              </span>
              <span className="text-l font-semibold text-gray-800 group-hover:text-red-700">
                Condomínio Jardins do Talatona, Torre 5 - Nº 003
                <br />
                Distrito Urbano do Talatona, Luanda - Angola
              </span>
            </div>
          </a>
        </div>

        {/* Mapa */}
        <div className="rounded-[5px] overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <iframe
            title="Localização da Envisio"
            src="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola&output=embed"
            width="100%"
            height="280"
            className="border-0"
            allowFullScreen
            loading="lazy"
            aria-label="Mapa mostrando a localização da Envisio"></iframe>
          <div className="bg-white p-4 border-t border-gray-100">
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Segoe UI Regular" }}>
              <strong>Endereço físico:</strong> Condomínio Jardins do Talatona,
              Torre 5 - Nº 003
            </p>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="mt-10">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Siga-nos</h3>
          <div className="flex gap-4">
            {[
              {
                icon: "facebook",
                color: "Black",
                url: "#",
                path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
              },
              {
                icon: "linkedin",
                color: "Black",
                url: "#",
                path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
              },
              {
                icon: "instagram",
                color: "pink",
                url: "#",
                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
              },
            ].map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-${social.color}-100 text-${social.color}-600 hover:bg-${social.color}-200 transition-colors shadow-sm`}
                aria-label={`${social.icon} da Envisio`}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* Seção do Formulário */}
      <aside
        aria-labelledby="contact-form-heading"
        className="bg-white rounded-[5px] shadow-xl p-8 border border-gray-100">
        {formSubmitted ? (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setFormSubmitted(false)}>
            <div
              className="success-modal-content bg-red-50 border-2 border-red-300 rounded-lg p-8 text-center max-w-md mx-4 shadow-2xl transform"
              onClick={(e) => e.stopPropagation()}>
              <div className="success-icon mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="success-title text-2xl font-bold text-red-800 mb-4">
                🎉 Mensagem Enviada!
              </h3>
              <p className="text-red-700 mb-6 text-lg font-medium">
                Obrigado pelo seu contato. Nossa equipe entrará em contato em
                breve.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="success-button bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Enviar Nova Mensagem
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="contact-form-heading"
              className="text-2xl font-bold mb-6 text-gray-800">
              Envie sua mensagem
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="tipoCliente"
                  className="block text-sm font-medium text-gray-700">
                  Tipo de Cliente <span className="text-red-600">*</span>
                </label>
                <select
                  id="tipoCliente"
                  value={tipoCliente}
                  onChange={(e) => setTipoCliente(e.target.value)}
                  className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
                  <option value="singular">Pessoa Singular</option>
                  <option value="empresa">Empresa</option>
                </select>
              </div>

              {tipoCliente === "singular" ? (
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700">
                    Nome completo <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="Digite seu nome"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700">
                      Nome <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="apelido"
                      className="block text-sm font-medium text-gray-700">
                      Apelido <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="apelido"
                      name="apelido"
                      type="text"
                      required
                      value={formData.apelido}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                      placeholder="Digite o apelido"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-medium text-gray-700">
                      Empresa <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      required
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                      placeholder="Digite o nome da empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="nif"
                      className="block text-sm font-medium text-gray-700">
                      NIF <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="nif"
                      name="nif"
                      type="text"
                      required
                      value={formData.nif}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                      placeholder="Digite o NIF da empresa"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  E-mail <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="+244 XXX XXX XXX"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700">
                  Mensagem <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Como podemos ajudar?"></textarea>
              </div>

              {/* Adiciona seleção de área */}
              <div className="space-y-2">
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700">
                  Área de Interesse <span className="text-red-600">*</span>
                </label>
                <select
                  id="area"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-[5px] px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
                  <option value="">Selecione uma área</option>
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                  <option value="aluguel">Aluguel de Equipamentos</option>
                </select>
              </div>

              {/* Método de comunicação */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Método de Contato <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="metodoComunicacao"
                      value="whatsapp"
                      checked={metodoComunicacao === "whatsapp"}
                      onChange={(e) => setMetodoComunicacao(e.target.value)}
                      className="form-radio text-red-600"
                    />
                    <span className="ml-2">WhatsApp</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="metodoComunicacao"
                      value="email"
                      checked={metodoComunicacao === "email"}
                      onChange={(e) => setMetodoComunicacao(e.target.value)}
                      className="form-radio text-red-600"
                    />
                    <span className="ml-2">E-mail</span>
                  </label>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-[5px] shadow hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-800"
                type="submit"
                disabled={isLoading}>
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Enviar{" "}
                    {metodoComunicacao === "whatsapp"
                      ? "via WhatsApp"
                      : "via E-mail"}
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </aside>
    </main>
  );
};

export default Contato;
