/** @format */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  X,
  Check,
  AlertCircle,
  Info,
  Settings,
  Key,
  CreditCard,
  FileText,
  Lock,
  Unlock,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../contextos/AuthContext";
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Configuracoes() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("perfil");

  // Estados do perfil
  const [perfil, setPerfil] = useState({
    nome: usuario?.nome || "",
    email: usuario?.email || "",
    // Os campos abaixo não existem no tipo 'Usuario', então inicializamos como valores padrão
    telefone: "",
    bio: "",
    localizacao: "",
    website: "",
    especialidades: [],
    experiencia: "", // Removido o acesso a usuario?.experiencia pois não existe na tipagem 'Usuario'
  });

  // Estados de segurança
  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
    confirmar: "",
  });

  // Estados de notificações
  const [notificacoes, setNotificacoes] = useState({
    novosAlunos: true,
    avaliacoes: true,
    mensagens: true,
    relatorios: true,
    marketing: false,
  });

  // Estados de privacidade
  const [privacidade, setPrivacidade] = useState({
    perfilPublico: true,
    mostrarEmail: false,
    mostrarTelefone: false,
    permitirMensagens: true,
    mostrarEstatisticas: true,
  });

  const handleSalvarPerfil = async () => {
    try {
      setCarregando(true);
      const response = await api.put("/instrutor/perfil", perfil);
      if (response.data.sucesso) {
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setCarregando(false);
    }
  };

  const handleAlterarSenha = async () => {
    if (senha.nova !== senha.confirmar) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      setCarregando(true);
      const response = await api.put("/instrutor/senha", {
        senhaAtual: senha.atual,
        novaSenha: senha.nova,
      });
      if (response.data.sucesso) {
        toast.success("Senha alterada com sucesso!");
        setSenha({ atual: "", nova: "", confirmar: "" });
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      toast.error("Erro ao alterar senha");
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvarNotificacoes = async () => {
    try {
      setCarregando(true);
      const response = await api.put("/instrutor/notificacoes", notificacoes);
      if (response.data.sucesso) {
        toast.success("Configurações de notificação salvas!");
      }
    } catch (error) {
      console.error("Erro ao salvar notificações:", error);
      toast.error("Erro ao salvar notificações");
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvarPrivacidade = async () => {
    try {
      setCarregando(true);
      const response = await api.put("/instrutor/privacidade", privacidade);
      if (response.data.sucesso) {
        toast.success("Configurações de privacidade salvas!");
      }
    } catch (error) {
      console.error("Erro ao salvar privacidade:", error);
      toast.error("Erro ao salvar privacidade");
    } finally {
      setCarregando(false);
    }
  };

  const abas = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "seguranca", label: "Segurança", icon: Shield },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "privacidade", label: "Privacidade", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/academia/instrutor/painel")}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300">
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao Painel
            </motion.button>
          </div>
          <p className="text-gray-600 mt-1">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Abas */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="flex border-b border-gray-200">
              {abas.map((aba) => {
                const Icon = aba.icon;
                const isActive = abaAtiva === aba.id;

                return (
                  <button
                    key={aba.id}
                    onClick={() => setAbaAtiva(aba.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}>
                    <Icon size={20} />
                    <span>{aba.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conteúdo das Abas */}
            <div className="p-6">
              {abaAtiva === "perfil" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {usuario?.nome?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        <Camera size={16} className="text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {usuario?.nome}
                      </h3>
                      <p className="text-gray-600">Instrutor</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={perfil.nome}
                        onChange={(e) =>
                          setPerfil({ ...perfil, nome: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={perfil.email}
                        onChange={(e) =>
                          setPerfil({ ...perfil, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={perfil.telefone}
                        onChange={(e) =>
                          setPerfil({ ...perfil, telefone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={perfil.website}
                        onChange={(e) =>
                          setPerfil({ ...perfil, website: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localização
                      </label>
                      <input
                        type="text"
                        value={perfil.localizacao}
                        onChange={(e) =>
                          setPerfil({ ...perfil, localizacao: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Anos de Experiência
                      </label>
                      <input
                        type="number"
                        value={perfil.experiencia}
                        onChange={(e) =>
                          setPerfil({ ...perfil, experiencia: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biografia
                    </label>
                    <textarea
                      rows={4}
                      value={perfil.bio}
                      onChange={(e) =>
                        setPerfil({ ...perfil, bio: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Conte um pouco sobre você e sua experiência..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSalvarPerfil}
                      disabled={carregando}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                      {carregando && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      )}
                      <Save size={16} className="mr-2" />
                      Salvar Perfil
                    </button>
                  </div>
                </motion.div>
              )}

              {abaAtiva === "seguranca" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle size={20} className="text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        Segurança da Conta
                      </span>
                    </div>
                    <p className="text-yellow-700 text-sm mt-1">
                      Mantenha sua conta segura alterando regularmente sua senha
                      e ativando a autenticação de dois fatores.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Alterar Senha
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha Atual
                          </label>
                          <input
                            type="password"
                            value={senha.atual}
                            onChange={(e) =>
                              setSenha({ ...senha, atual: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nova Senha
                          </label>
                          <input
                            type="password"
                            value={senha.nova}
                            onChange={(e) =>
                              setSenha({ ...senha, nova: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar Nova Senha
                          </label>
                          <input
                            type="password"
                            value={senha.confirmar}
                            onChange={(e) =>
                              setSenha({ ...senha, confirmar: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirme a nova senha"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleAlterarSenha}
                          disabled={carregando}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                          <Key size={16} className="mr-2" />
                          Alterar Senha
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Autenticação de Dois Fatores
                      </h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Autenticação de Dois Fatores
                          </h4>
                          <p className="text-sm text-gray-600">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Ativar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {abaAtiva === "notificacoes" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Info size={20} className="text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Notificações
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      Configure como e quando você deseja receber notificações
                      sobre suas atividades na plataforma.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(notificacoes).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Receber notificações sobre{" "}
                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setNotificacoes({
                                ...notificacoes,
                                [key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSalvarNotificacoes}
                      disabled={carregando}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                      <Save size={16} className="mr-2" />
                      Salvar Configurações
                    </button>
                  </div>
                </motion.div>
              )}

              {abaAtiva === "privacidade" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Shield size={20} className="text-green-600" />
                      <span className="font-medium text-green-800">
                        Privacidade
                      </span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Controle como suas informações são exibidas para outros
                      usuários da plataforma.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(privacidade).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === "perfilPublico" &&
                              "Tornar seu perfil visível para outros usuários"}
                            {key === "mostrarEmail" &&
                              "Exibir seu email no perfil público"}
                            {key === "mostrarTelefone" &&
                              "Exibir seu telefone no perfil público"}
                            {key === "permitirMensagens" &&
                              "Permitir que alunos enviem mensagens"}
                            {key === "mostrarEstatisticas" &&
                              "Exibir estatísticas dos seus cursos"}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setPrivacidade({
                                ...privacidade,
                                [key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSalvarPrivacidade}
                      disabled={carregando}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                      <Save size={16} className="mr-2" />
                      Salvar Configurações
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
