/** @format */

import React, { useState, useEffect, useRef } from "react";
import { enviarEmail } from "../services/email";
import "./Contato.css";

const SuporteTecnico: React.FC = () => {
  // Ref para controlar se o componente está montado
  const isMountedRef = useRef(true);

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    urgency: "",
    issue: "",
    area: "suporte",
    message: "",
    empresa: "",
    apelido: "",
    nif: "",
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState<"form" | "faq">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect para cleanup
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Função para limpar o formulário
  const resetForm = () => {
    if (!isMountedRef.current) return;
    setFormData(initialFormState);
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

  // Função para enviar por email
  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting || !isMountedRef.current) {
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      // Mapear dados do suporte para formato do email
      const emailData = {
        ...formData,
        message: `SOLICITAÇÃO DE SUPORTE TÉCNICO\n\nPrioridade: ${formData.urgency}\n\nDescrição do Problema:\n${formData.issue}`,
        area: "suporte",
      };

      const response = await enviarEmail(emailData, "singular");

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
        alert("Erro ao enviar solicitação. Tente novamente.");
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-[5px] px-8 py-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Suporte Técnico Especializado
              </h1>
              <p className="text-lg text-red-100 max-w-2xl">
                Soluções rápidas e atendimento personalizado para sua empresa
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:geral@envisio.co.ao"
                className="flex items-center justify-center gap-2 bg-red-900 hover:bg-red-950 text-white px-5 py-3 rounded-[5px] font-medium shadow-md transition-all duration-300">
                <span className="inline-flex items-center justify-center w-6 h-6">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                geral@envisio.co.ao
              </a>
            </div>
          </div>
        </div>

        {/* Container principal */}
        <div className="bg-white rounded-[5px] shadow-xl overflow-hidden">
          {/* Abas de navegação */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("form")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "form"
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}>
                Solicitar Suporte
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === "faq"
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}>
                Perguntas Frequentes
              </button>
            </nav>
          </div>

          {/* Conteúdo das abas */}
          <div className="p-6 md:p-8">
            {activeTab === "form" ? (
              formSubmitted ? (
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
                      🎉 Solicitação Enviada!
                    </h3>
                    <p className="text-red-700 mb-6 text-lg font-medium">
                      Nossa equipe de suporte recebeu sua solicitação e entrará
                      em contato em breve.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="success-button bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Nova Solicitação
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Informações do Serviço
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-[5px]">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Atendimento Rápido
                          </h3>
                          <p className="text-gray-600 mt-1">
                            Tempo médio de resposta: <strong>15 minutos</strong>{" "}
                            para chamados prioritários
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-[5px]">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Especialistas Qualificados
                          </h3>
                          <p className="text-gray-600 mt-1">
                            Equipe certificada em diversas tecnologias e
                            plataformas
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-[5px]">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Horário de Atendimento
                          </h3>
                          <p className="text-gray-600 mt-1">
                            Segunda a Sexta: <strong>08h - 18h</strong>
                            <br />
                            Plantão 24h para clientes prioritários
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Formulário de Solicitação
                    </h2>
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            Telefone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            placeholder="+244 XXX XXX XXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="urgency"
                          className="block text-sm font-medium text-gray-700 mb-1">
                          Prioridade <span className="text-red-600">*</span>
                        </label>
                        <select
                          id="urgency"
                          name="urgency"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          value={formData.urgency}
                          onChange={handleInputChange}>
                          <option value="">Selecione a urgência</option>
                          <option value="Baixa">
                            Baixa (Atendimento normal)
                          </option>
                          <option value="Média">
                            Média (Problema operacional)
                          </option>
                          <option value="Alta">
                            Alta (Sistema crítico parado)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="issue"
                          className="block text-sm font-medium text-gray-700 mb-1">
                          Descreva seu problema{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          id="issue"
                          name="issue"
                          rows={4}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          placeholder="Descreva detalhadamente o problema encontrado..."
                          value={formData.issue}
                          onChange={handleInputChange}></textarea>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-6 rounded-[5px] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
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
                              Enviar via E-mail
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Perguntas Frequentes
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      question:
                        "Qual o tempo médio de resposta para solicitações?",
                      answer:
                        "Para solicitações normais, o tempo médio é de 2 horas úteis. Para chamados prioritários (marcados como alta urgência), garantimos resposta em até 15 minutos durante o horário comercial.",
                    },
                    {
                      question: "Vocês oferecem suporte presencial?",
                      answer:
                        "Sim, oferecemos suporte presencial para clientes em Luanda. Para outras localidades, avaliamos caso a caso. O suporte remoto é nossa modalidade padrão e resolve a maioria dos problemas técnicos.",
                    },
                    {
                      question: "Como faço para acompanhar meu chamado?",
                      answer:
                        "Todos os chamados recebem um número de protocolo que é enviado por e-mail. Você pode acompanhar pelo nosso portal de clientes ou entrar em contato via WhatsApp para atualizações.",
                    },
                    {
                      question: "Quais tipos de suporte vocês oferecem?",
                      answer:
                        "Oferecemos suporte para: sistemas operacionais, aplicativos empresariais, hardware, redes, servidores, cloud computing, segurança da informação e treinamentos técnicos.",
                    },
                    {
                      question: "Vocês têm plantão 24 horas?",
                      answer:
                        "Oferecemos plantão 24/7 apenas para clientes com contrato de suporte prioritário. Para demais clientes, o atendimento ocorre de segunda a sexta, das 8h às 18h.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition"
                        onClick={(e) => {
                          const content = e.currentTarget.nextElementSibling;
                          if (content) {
                            content.classList.toggle("hidden");
                          }
                        }}>
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-500 transform transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="hidden p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuporteTecnico;
