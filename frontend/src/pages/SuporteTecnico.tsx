/** @format */

import React from "react";

const SuporteTecnico: React.FC = () => (
  <div className="min-h-screen bg-white py-16 px-4 flex flex-col items-center">
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-black mb-2">
            Suporte Técnico
          </h1>
          <p className="text-lg text-gray-600">
            Atendimento ágil, humano e especializado para sua empresa.
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <a
            href="mailto:suporte@envisio.co.ao"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            suporte@envisio.co.ao
          </a>
          <a
            href="https://wa.me/244947137676"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow transition">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#fff" />
              <path
                d="M22.5 17.8c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a7.7 7.7 0 01-2.3-2.2c-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5s-.7-1.7-1-2.3c-.2-.5-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3a2.8 2.8 0 00-.9 2.1c0 1.2.8 2.4 1.1 2.8.3.4 2.1 3.3 5.1 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z"
                fill="#25D366"
              />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-gray-100 my-8" />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-black mb-3">
            Como podemos ajudar?
          </h2>
          <ul className="mb-6 list-disc list-inside text-gray-700 space-y-2">
            <li>Atendimento remoto e presencial</li>
            <li>Suporte para sistemas, softwares e equipamentos</li>
            <li>Resolução de problemas técnicos e dúvidas</li>
            <li>Consultoria para otimização de TI</li>
            <li>Treinamento e orientação para equipes</li>
          </ul>
          <div className="bg-gray-50 rounded-lg p-4 text-black font-medium shadow-sm mb-4">
            <span className="block mb-1">Horário de atendimento:</span>
            <span>Segunda a Sexta, das 08h às 18h</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-black mb-3">
            Solicite Suporte
          </h2>
          <form className="space-y-4">
            <input
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
              type="text"
              placeholder="Seu nome"
            />
            <input
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
              type="email"
              placeholder="Seu e-mail"
            />
            <textarea
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
              rows={4}
              placeholder="Descreva seu problema ou dúvida"
            />
            <button
              className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition"
              type="submit">
              Enviar Solicitação
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm">
        <span>
          Precisa de atendimento urgente? Fale conosco pelo WhatsApp ou e-mail
          acima.
        </span>
      </div>
    </div>
  </div>
);

export default SuporteTecnico;
