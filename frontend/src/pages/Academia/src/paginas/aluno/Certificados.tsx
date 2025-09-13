/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Download,
  Calendar,
  Star,
  CheckCircle,
  FileText,
} from "lucide-react";
import api from "../../utils/api";

interface Certificado {
  id: string;
  titulo: string;
  data_conclusao: string;
  nota?: number;
}

export default function Certificados() {
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarCertificados();
  }, []);

  const carregarCertificados = async () => {
    try {
      const response = await api.get("/perfil-aluno");
      if (response.data.sucesso) {
        setCertificados(response.data.dados.certificados);
      }
    } catch (error: any) {
      setErro(error.response?.data?.erro || "Erro ao carregar certificados");
    } finally {
      setCarregando(false);
    }
  };

  const baixarCertificado = async (cursoId: string) => {
    try {
      const response = await api.get(`/certificados/${cursoId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificado-${cursoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Erro ao baixar certificado");
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Meus Certificados
                </h1>
                <p className="text-gray-600 mt-2">
                  Baixe seus certificados de conclusão
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total de Certificados</p>
                <p className="text-2xl font-bold text-orange-600">
                  {certificados.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Certificados */}
        <div className="container mx-auto px-4 py-6">
          {erro ? (
            <div className="text-center py-8">
              <p className="text-red-600">{erro}</p>
            </div>
          ) : certificados.length === 0 ? (
            <div className="text-center py-8">
              <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum certificado ainda
              </h3>
              <p className="text-gray-600 mb-4">
                Complete seus cursos para obter certificados de conclusão.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificados.map((certificado, index) => (
                <motion.div
                  key={certificado.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 overflow-hidden">
                  {/* Header do Certificado */}
                  <div className="p-6 border-b border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="text-orange-600" size={24} />
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {certificado.titulo}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-1" size={14} />
                      <span>
                        Concluído em{" "}
                        {new Date(
                          certificado.data_conclusao
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Status
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          Concluído
                        </span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    {certificado.nota && (
                      <div className="flex items-center mb-4">
                        <Star
                          className="text-yellow-400 fill-current mr-1"
                          size={16}
                        />
                        <span className="text-sm text-gray-600">
                          Nota: {certificado.nota}/10
                        </span>
                      </div>
                    )}

                    {/* Botões */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => baixarCertificado(certificado.id)}
                        className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm flex items-center justify-center">
                        <Download className="mr-2" size={16} />
                        Baixar PDF
                      </button>
                      <button className="p-2 bg-orange-200 text-orange-600 rounded-lg hover:bg-orange-300 transition-colors">
                        <FileText size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
