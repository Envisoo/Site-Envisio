/** @format */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  empresa: string;
  mensagem: string;
  turno: string;
  arquivos: FileList | null;
}

interface FormularioInscricaoProps {
  isOpen: boolean;
  onClose: () => void;
  cursoNome: string;
  cursoArea?: string;
  onSuccess?: () => void;
}

declare module "react" {
  interface CSSProperties {
    "&::-webkit-scrollbar"?: CSSProperties;
    "&::-webkit-scrollbar-track"?: CSSProperties;
    "&::-webkit-scrollbar-thumb"?: CSSProperties;
  }
}

const FormularioInscricao: React.FC<FormularioInscricaoProps> = ({
  isOpen,
  onClose,
  cursoNome,
  cursoArea = "Academia Envisio",
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Omit<FormData, "arquivos">>({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    turno: "",
  });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivos(e.target.files);
      setFileNames(Array.from(e.target.files).map((file) => file.name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !formData.nome ||
      !formData.sobrenome ||
      !formData.email ||
      !formData.turno
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nome", formData.nome);
      formDataToSend.append("sobrenome", formData.sobrenome);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("telefone", formData.telefone);
      formDataToSend.append("empresa", formData.empresa);
      formDataToSend.append("mensagem", formData.mensagem);
      formDataToSend.append("turno", formData.turno);
      formDataToSend.append("curso", cursoNome);
      formDataToSend.append("area", cursoArea);

      if (arquivos) {
        Array.from(arquivos).forEach((file) => {
          formDataToSend.append("arquivos", file);
        });
      }

      await axios.post("http://localhost:8080/api/email", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setFormData({
          nome: "",
          sobrenome: "",
          email: "",
          telefone: "",
          empresa: "",
          mensagem: "",
          turno: "",
        });
        setArquivos(null);
        setFileNames([]);

        if (onSuccess) {
          onSuccess();
        }
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      setError(
        "Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setError("");
      setSuccess(false);
    }
  };

  if (!isOpen) return null;

  const formContainerStyle: React.CSSProperties = {
    maxHeight: "70vh",
    overflowY: "auto" as const, // Using 'as const' to ensure type safety
    paddingRight: "0.5rem",
    scrollbarWidth: "thin" as const,
    scrollbarColor: "#9ca3af #e5e7eb",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    } as React.CSSProperties,
    "&::-webkit-scrollbar-track": {
      background: "#e5e7eb",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#9ca3af",
      borderRadius: "4px",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-4"
        onClick={handleClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-full max-w-md mx-auto bg-white rounded-[5px] shadow-xl relative overflow-visible"
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            e.stopPropagation()
          }>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Inscrição {cursoNome}
              </h3>
              <button
                onClick={handleClose}
                disabled={loading}
                className="text-gray-500 hover:text-gray-700 focus:outline-none disabled:cursor-not-allowed">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Inscrição Realizada!
                </h4>
                <p className="text-gray-600">Em breve entraremos em contato.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                style={formContainerStyle}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primeiro Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-[5px] "
                      placeholder="Primeiro nome"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Último Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sobrenome}
                      onChange={(e) =>
                        setFormData({ ...formData, sobrenome: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-[5px] "
                      placeholder="Último nome"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-[5px]"
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Turno *
                  </label>
                  <select
                    required
                    value={formData.turno}
                    onChange={(e) =>
                      setFormData({ ...formData, turno: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-[5px]"
                    disabled={loading}>
                    <option value="">Selecione um turno</option>
                    <option value="Segunda a Sexta - 9h às 17h">
                      Segunda a Sexta - 9h às 17h
                    </option>
                    <option value="Sábado - 8h às 17h">
                      Sábado - (8h às 12h) e Domingo - (8h às 17h)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        telefone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-[5px] "
                    placeholder="(XXX) XXX-XXX-XXXX"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        empresa: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-[5px] "
                    placeholder="Sua empresa (opcional)"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anexar Documentos (PDF)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                          <span>Carregar ficheiros</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            accept=".pdf"
                            onChange={handleFileChange}
                            disabled={loading}
                          />
                        </label>
                        <p className="pl-1">ou arraste e solte</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF até 10MB cada</p>
                      {fileNames.length > 0 && (
                        <div className="mt-4 text-left">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Ficheiros selecionados:
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                            {fileNames.map((file, index) => (
                              <li key={index} className="flex items-center">
                                <svg
                                  className="flex-shrink-0 h-4 w-4 text-gray-500 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                {file}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    value={formData.mensagem}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mensagem: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-[5px] "
                    placeholder="Alguma observação ou dúvida?"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-[5px] transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    </span>
                  ) : (
                    "Confirmar Inscrição"
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormularioInscricao;
