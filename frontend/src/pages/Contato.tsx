/** @format */

import React from "react";

const Contato: React.FC = () => (
  <div className="max-w-5xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12">
    {/* Informações da empresa */}
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-extrabold mb-4 text-red-700">Contato</h1>
      <p className="mb-6 text-lg text-gray-700">
        Fale conosco ou venha nos visitar!
      </p>
      <div className="mb-6 space-y-5">
        {/* WhatsApp */}
        <a
          href="https://wa.me/244947137676"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group hover:bg-green-50 rounded-lg px-2 py-1 transition">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 shadow group-hover:bg-green-200">
            {/* WhatsApp SVG aprimorado */}
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#25D366" />
              <path
                d="M22.5 17.8c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a7.7 7.7 0 01-2.3-2.2c-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5s-.7-1.7-1-2.3c-.2-.5-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3a2.8 2.8 0 00-.9 2.1c0 1.2.8 2.4 1.1 2.8.3.4 2.1 3.3 5.1 4.2.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z"
                fill="#fff"
              />
            </svg>
          </span>
          <span className="text-lg font-medium text-gray-800 group-hover:text-green-700">
            +244 947 137 676
          </span>
        </a>
        {/* Email */}
        <a
          href="mailto:geral@envisio.co.ao"
          className="flex items-center gap-3 group hover:bg-blue-50 rounded-lg px-2 py-1 transition">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 shadow group-hover:bg-blue-200">
            {/* Email SVG */}
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
          <span className="text-lg font-medium text-gray-800 group-hover:text-blue-700">
            geral@envisio.co.ao
          </span>
        </a>
        {/* Endereço / Mapa */}
        <a
          href="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 group hover:bg-red-50 rounded-lg px-2 py-1 transition">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 shadow group-hover:bg-red-200 mt-1">
            {/* Mapa SVG */}
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
          <span className="text-lg font-medium text-gray-800 group-hover:text-red-700">
            Condomínio Jardins do Talatona, Torre 5 - Nº 003
            <br />
            Distrito Urbano do Talatona, Luanda - Angola
          </span>
        </a>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 mt-6">
        <iframe
          title="Mapa Envisio"
          src="https://www.google.com/maps?q=Condom%C3%ADnio%20Jardins%20do%20Talatona%2C%20Torre%205%20-%20N%C2%BA%20003%2C%20Luanda%2C%20Angola&output=embed"
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    {/* Formulário de contato */}
    <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Envie uma mensagem
      </h2>
      <form className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          type="text"
          placeholder="Seu nome"
        />
        <input
          className="w-full border rounded px-3 py-2"
          type="email"
          placeholder="Seu e-mail"
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={4}
          placeholder="Sua mensagem"
        />
        <button
          className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition"
          type="submit">
          Enviar
        </button>
      </form>
    </div>
  </div>
);

export default Contato;
