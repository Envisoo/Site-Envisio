/** @format */

import React, { useState } from "react";

const SuporteTecnico: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    urgency: "",
    issue: "",
  });
  const [activeTab, setActiveTab] = useState<"form" | "faq">("form");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-t-2xl px-8 py-6 shadow-lg">
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
                href="https://wa.me/244947137676"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-gray-100 px-5 py-3 rounded-lg font-semibold shadow-md transition-all duration-300">
                <span className="inline-flex items-center justify-center w-6 h-6">
                  <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                    <circle cx="16" cy="16" r="16" fill="#25D366" />
                    <path
                      d="M22.5 17.8c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a7.7 7.7 0 01-2.3-2.2c-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5s-.7-1.7-1-2.3c-.2-.5-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3a2.8 2.8 0 00-.9 2.1c0 1.2.8 2.4 1.1 2.8.3.4 2.1 3.3 5.1 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z"
                      fill="#fff"
                    />
                  </svg>
                </span>
                WhatsApp Prioritário
              </a>
              <a
                href="mailto:suporte@envisio.co.ao"
                className="flex items-center justify-center gap-2 bg-red-900 hover:bg-red-950 text-white px-5 py-3 rounded-lg font-medium shadow-md transition-all duration-300">
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
                suporte@envisio.co.ao
              </a>
            </div>
          </div>
        </div>

        {/* Container principal */}
        <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
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
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Solicitação Registrada!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Nossa equipe já recebeu sua solicitação e entrará em contato
                    em breve. Caso necessário, utilize nossos canais
                    prioritários para atendimento imediato.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition">
                    Nova Solicitação
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Informações do Serviço
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-lg">
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
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-lg">
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
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-lg">
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
                    <form
                      onSubmit={e => e.preventDefault()}
                      className="space-y-4">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((f) => ({ ...f, name: e.target.value }))
                          }
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((f) => ({
                                ...f,
                                email: e.target.value,
                              }))
                            }
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                            placeholder="+244 XXX XXX XXX"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((f) => ({
                                ...f,
                                phone: e.target.value,
                              }))
                            }
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          value={formData.urgency}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              urgency: e.target.value,
                            }))
                          }>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                          placeholder="Descreva detalhadamente o problema encontrado..."
                          value={formData.issue}
                          onChange={(e) =>
                            setFormData((f) => ({
                              ...f,
                              issue: e.target.value,
                            }))
                          }></textarea>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          onClick={() => {
                            // Monta mensagem para o WhatsApp e para o e-mail
                            const msg =
                              `*Solicitação de Suporte Técnico*\n` +
                              `Nome: ${formData.name}\n` +
                              `E-mail: ${formData.email}\n` +
                              `Telefone: ${formData.phone}\n` +
                              `Prioridade: ${formData.urgency}\n` +
                              `Problema: ${formData.issue}`;
                            if (!formData.name || !formData.email || !formData.urgency || !formData.issue) {
                              alert("Por favor, preencha todos os campos obrigatórios.");
                              return;
                            }
                            if (formData.urgency === "Alta") {
                              // Envia para WhatsApp prioritário
                              const url = `https://wa.me/244959849434?text=${encodeURIComponent(msg)}`;
                              window.open(url, "_blank");
                            } else {
                              // Envia por e-mail
                              const subject = encodeURIComponent("Solicitação de Suporte Técnico");
                              const body = encodeURIComponent(
                                `Nome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\nPrioridade: ${formData.urgency}\nProblema: ${formData.issue}`
                              );
                              window.open(
                                `mailto:suporte@envisio.co.ao?subject=${subject}&body=${body}`,
                                "_blank"
                              );
                            }
                            setFormSubmitted(true);
                          }}
                        >
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
                          Enviar Solicitação
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

        {/* Rodapé informativo */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Para emergências críticas fora do horário comercial, contate nosso
            WhatsApp prioritário:{" "}
            <a
              href="https://wa.me/244947137676"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline font-medium">
              +244 947 137 676
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuporteTecnico;
