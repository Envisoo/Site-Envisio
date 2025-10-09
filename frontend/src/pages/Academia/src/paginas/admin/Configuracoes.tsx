/** @format */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Settings,
  ArrowLeft,
  Save,
  RefreshCw,
  Shield,
  Database,
  Mail,
  Bell,
  Palette,
  Download,
  Eye,
  EyeOff,
  Clock,
  Zap,
  Server,
  Wifi,
  HardDrive,
  Cpu,
  // Memory, // Removido porque não existe exportação 'Memory' em 'lucide-react'
} from "lucide-react";

interface ConfiguracoesSistema {
  geral: {
    nomePlataforma: string;
    emailContato: string;
    telefone: string;
    endereco: string;
    timezone: string;
    idioma: string;
  };
  seguranca: {
    forcarSenhaForte: boolean;
    expiracaoSenha: number;
    tentativasLogin: number;
    autenticacao2FA: boolean;
    sessaoTimeout: number;
  };
  email: {
    servidorSMTP: string;
    portaSMTP: number;
    usuarioSMTP: string;
    senhaSMTP: string;
    emailRemetente: string;
    nomeRemetente: string;
  };
  backup: {
    backupAutomatico: boolean;
    frequenciaBackup: string;
    retencaoBackup: number;
    localBackup: string;
    backupCloud: boolean;
  };
  notificacoes: {
    emailNotificacoes: boolean;
    pushNotificacoes: boolean;
    notificacoesAdmin: boolean;
    notificacoesInstrutor: boolean;
    notificacoesAluno: boolean;
  };
  tema: {
    modoEscuro: boolean;
    corPrimaria: string;
    corSecundaria: string;
    fontePrincipal: string;
    tamanhoFonte: string;
  };
}

export default function Configuracoes() {
  const navigate = useNavigate();
  const [configuracoes, setConfiguracoes] =
    useState<ConfiguracoesSistema | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("geral");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [backupEmAndamento, setBackupEmAndamento] = useState(false);
  const [sistemaInfo, setSistemaInfo] = useState({
    cpu: "0%",
    memoria: "0%",
    disco: "0%",
    rede: "0 Mbps",
    uptime: "0 dias",
    versao: "v2.1.0",
  });

  useEffect(() => {
    carregarConfiguracoes();
    carregarInfoSistema();
    // Simular monitoramento em tempo real
    const interval = setInterval(carregarInfoSistema, 5000);
    return () => clearInterval(interval);
  }, []);

  const carregarConfiguracoes = async () => {
    try {
      // Simular carregamento das configurações
      const mockConfig: ConfiguracoesSistema = {
        geral: {
          nomePlataforma: "Academia Envisio",
          emailContato: "contato@envisio.com",
          telefone: "+55 11 99999-9999",
          endereco: "São Paulo, SP, Brasil",
          timezone: "America/Sao_Paulo",
          idioma: "pt-BR",
        },
        seguranca: {
          forcarSenhaForte: true,
          expiracaoSenha: 90,
          tentativasLogin: 5,
          autenticacao2FA: true,
          sessaoTimeout: 30,
        },
        email: {
          servidorSMTP: "smtp.gmail.com",
          portaSMTP: 587,
          usuarioSMTP: "sistema@envisio.com",
          senhaSMTP: "********",
          emailRemetente: "noreply@envisio.com",
          nomeRemetente: "Sistema Envisio",
        },
        backup: {
          backupAutomatico: true,
          frequenciaBackup: "diario",
          retencaoBackup: 30,
          localBackup: "/backups/",
          backupCloud: true,
        },
        notificacoes: {
          emailNotificacoes: true,
          pushNotificacoes: true,
          notificacoesAdmin: true,
          notificacoesInstrutor: true,
          notificacoesAluno: true,
        },
        tema: {
          modoEscuro: true,
          corPrimaria: "#3B82F6",
          corSecundaria: "#8B5CF6",
          fontePrincipal: "Inter",
          tamanhoFonte: "medium",
        },
      };
      setConfiguracoes(mockConfig);
    } catch (error) {
      toast.error("Erro ao carregar configurações");
    } finally {
      setCarregando(false);
    }
  };

  const carregarInfoSistema = () => {
    // Simular dados do sistema
    setSistemaInfo({
      cpu: `${Math.floor(Math.random() * 30) + 10}%`,
      memoria: `${Math.floor(Math.random() * 40) + 20}%`,
      disco: `${Math.floor(Math.random() * 20) + 60}%`,
      rede: `${Math.floor(Math.random() * 100) + 50} Mbps`,
      uptime: `${Math.floor(Math.random() * 30) + 15} dias`,
      versao: "v2.1.0",
    });
  };

  const salvarConfiguracoes = async () => {
    setSalvando(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar configurações");
    } finally {
      setSalvando(false);
    }
  };

  const executarBackup = async () => {
    setBackupEmAndamento(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success("Backup executado com sucesso!");
    } catch (error) {
      toast.error("Erro ao executar backup");
    } finally {
      setBackupEmAndamento(false);
    }
  };

  const testarEmail = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Email de teste enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar email de teste");
    }
  };

  const handleVoltar = () => {
    navigate("/academia/admin");
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Toaster position="top-right" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative px-8 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoltar}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <ArrowLeft className="text-white" size={24} />
              </motion.button>
              <div>
                <h1 className="text-4xl font-bold text-white">Configurações</h1>
                <p className="text-gray-300 mt-1">
                  Gerencie as configurações do sistema
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={salvarConfiguracoes}
              disabled={salvando}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center disabled:opacity-50">
              {salvando ? (
                <RefreshCw className="mr-2 animate-spin" size={20} />
              ) : (
                <Save className="mr-2" size={20} />
              )}
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 sticky top-8">
              <nav className="space-y-2">
                {[
                  { id: "geral", label: "Geral", icon: Settings },
                  { id: "seguranca", label: "Segurança", icon: Shield },
                  { id: "email", label: "Email", icon: Mail },
                  { id: "backup", label: "Backup", icon: Database },
                  { id: "notificacoes", label: "Notificações", icon: Bell },
                  { id: "tema", label: "Tema", icon: Palette },
                  { id: "sistema", label: "Sistema", icon: Server },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAbaAtiva(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      abaAtiva === item.id
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}>
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {abaAtiva === "geral" && (
                <motion.div
                  key="geral"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Settings className="mr-3" size={28} />
                    Configurações Gerais
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ConfigInput
                      label="Nome da Plataforma"
                      value={configuracoes?.geral.nomePlataforma || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                geral: { ...prev.geral, nomePlataforma: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Email de Contato"
                      type="email"
                      value={configuracoes?.geral.emailContato || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                geral: { ...prev.geral, emailContato: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Telefone"
                      value={configuracoes?.geral.telefone || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                geral: { ...prev.geral, telefone: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Endereço"
                      value={configuracoes?.geral.endereco || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                geral: { ...prev.geral, endereco: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigSelect
                      label="Fuso Horário"
                      value={configuracoes?.geral.timezone || ""}
                      options={[
                        {
                          value: "America/Sao_Paulo",
                          label: "São Paulo (GMT-3)",
                        },
                        {
                          value: "America/New_York",
                          label: "Nova York (GMT-5)",
                        },
                        { value: "Europe/London", label: "Londres (GMT+0)" },
                      ]}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                geral: { ...prev.geral, timezone: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigSelect
                      label="Idioma"
                      value={configuracoes?.geral.idioma || ""}
                      options={[
                        { value: "pt-BR", label: "Português (Brasil)" },
                        { value: "en-US", label: "English (US)" },
                        { value: "es-ES", label: "Español" },
                      ]}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                geral: { ...prev.geral, idioma: value },
                              }
                            : null
                        )
                      }
                    />
                  </div>
                </motion.div>
              )}

              {abaAtiva === "seguranca" && (
                <motion.div
                  key="seguranca"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Shield className="mr-3" size={28} />
                    Configurações de Segurança
                  </h2>

                  <div className="space-y-6">
                    <ConfigToggle
                      label="Forçar Senha Forte"
                      description="Exigir senhas com caracteres especiais, números e letras maiúsculas"
                      value={configuracoes?.seguranca.forcarSenhaForte || false}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                seguranca: {
                                  ...prev.seguranca,
                                  forcarSenhaForte: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigToggle
                      label="Autenticação 2FA"
                      description="Exigir autenticação de dois fatores para administradores"
                      value={configuracoes?.seguranca.autenticacao2FA || false}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                seguranca: {
                                  ...prev.seguranca,
                                  autenticacao2FA: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigNumber
                      label="Expiração de Senha (dias)"
                      value={configuracoes?.seguranca.expiracaoSenha || 90}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                seguranca: {
                                  ...prev.seguranca,
                                  expiracaoSenha: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigNumber
                      label="Tentativas de Login"
                      value={configuracoes?.seguranca.tentativasLogin || 5}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                seguranca: {
                                  ...prev.seguranca,
                                  tentativasLogin: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigNumber
                      label="Timeout de Sessão (minutos)"
                      value={configuracoes?.seguranca.sessaoTimeout || 30}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                seguranca: {
                                  ...prev.seguranca,
                                  sessaoTimeout: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                  </div>
                </motion.div>
              )}

              {abaAtiva === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Mail className="mr-3" size={28} />
                      Configurações de Email
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={testarEmail}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium">
                      Testar Email
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ConfigInput
                      label="Servidor SMTP"
                      value={configuracoes?.email.servidorSMTP || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                email: { ...prev.email, servidorSMTP: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigNumber
                      label="Porta SMTP"
                      value={configuracoes?.email.portaSMTP || 587}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                email: { ...prev.email, portaSMTP: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Usuário SMTP"
                      value={configuracoes?.email.usuarioSMTP || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                email: { ...prev.email, usuarioSMTP: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Senha SMTP"
                      type="password"
                      value={configuracoes?.email.senhaSMTP || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                email: { ...prev.email, senhaSMTP: value },
                              }
                            : null
                        )
                      }
                      showPassword={mostrarSenha}
                      onTogglePassword={() => setMostrarSenha(!mostrarSenha)}
                    />
                    <ConfigInput
                      label="Email Remetente"
                      type="email"
                      value={configuracoes?.email.emailRemetente || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                email: { ...prev.email, emailRemetente: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Nome Remetente"
                      value={configuracoes?.email.nomeRemetente || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                email: { ...prev.email, nomeRemetente: value },
                              }
                            : null
                        )
                      }
                    />
                  </div>
                </motion.div>
              )}

              {abaAtiva === "backup" && (
                <motion.div
                  key="backup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Database className="mr-3" size={28} />
                      Configurações de Backup
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={executarBackup}
                      disabled={backupEmAndamento}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-50 flex items-center">
                      {backupEmAndamento ? (
                        <RefreshCw className="mr-2 animate-spin" size={16} />
                      ) : (
                        <Download className="mr-2" size={16} />
                      )}
                      {backupEmAndamento ? "Executando..." : "Executar Backup"}
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    <ConfigToggle
                      label="Backup Automático"
                      description="Executar backups automaticamente"
                      value={configuracoes?.backup.backupAutomatico || false}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                backup: {
                                  ...prev.backup,
                                  backupAutomatico: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigSelect
                      label="Frequência do Backup"
                      value={configuracoes?.backup.frequenciaBackup || ""}
                      options={[
                        { value: "diario", label: "Diário" },
                        { value: "semanal", label: "Semanal" },
                        { value: "mensal", label: "Mensal" },
                      ]}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                backup: {
                                  ...prev.backup,
                                  frequenciaBackup: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigNumber
                      label="Retenção de Backup (dias)"
                      value={configuracoes?.backup.retencaoBackup || 30}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                backup: {
                                  ...prev.backup,
                                  retencaoBackup: value,
                                },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigInput
                      label="Local do Backup"
                      value={configuracoes?.backup.localBackup || ""}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                backup: { ...prev.backup, localBackup: value },
                              }
                            : null
                        )
                      }
                    />
                    <ConfigToggle
                      label="Backup na Nuvem"
                      description="Fazer backup também na nuvem"
                      value={configuracoes?.backup.backupCloud || false}
                      onChange={(value) =>
                        setConfiguracoes((prev) =>
                          prev
                            ? {
                                ...prev,
                                backup: { ...prev.backup, backupCloud: value },
                              }
                            : null
                        )
                      }
                    />
                  </div>
                </motion.div>
              )}

              {abaAtiva === "notificacoes" && (
                <motion.div
                  key="notificacoes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Bell className="mr-3" size={28} />
                    Configurações de Notificações
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ConfigToggle
                        label="Notificações por Email"
                        description="Receber notificações importantes por email"
                        value={
                          configuracoes?.notificacoes.emailNotificacoes || false
                        }
                        onChange={(value) =>
                          setConfiguracoes((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  notificacoes: {
                                    ...prev.notificacoes,
                                    emailNotificacoes: value,
                                  },
                                }
                              : null
                          )
                        }
                      />
                      <ConfigToggle
                        label="Notificações Push"
                        description="Receber notificações em tempo real no navegador"
                        value={
                          configuracoes?.notificacoes.pushNotificacoes || false
                        }
                        onChange={(value) =>
                          setConfiguracoes((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  notificacoes: {
                                    ...prev.notificacoes,
                                    pushNotificacoes: value,
                                  },
                                }
                              : null
                          )
                        }
                      />
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Notificações por Tipo de Usuário
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ConfigToggle
                          label="Administradores"
                          description="Notificações para administradores do sistema"
                          value={
                            configuracoes?.notificacoes.notificacoesAdmin ||
                            false
                          }
                          onChange={(value) =>
                            setConfiguracoes((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    notificacoes: {
                                      ...prev.notificacoes,
                                      notificacoesAdmin: value,
                                    },
                                  }
                                : null
                            )
                          }
                        />
                        <ConfigToggle
                          label="Instrutores"
                          description="Notificações para instrutores"
                          value={
                            configuracoes?.notificacoes.notificacoesInstrutor ||
                            false
                          }
                          onChange={(value) =>
                            setConfiguracoes((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    notificacoes: {
                                      ...prev.notificacoes,
                                      notificacoesInstrutor: value,
                                    },
                                  }
                                : null
                            )
                          }
                        />
                        <ConfigToggle
                          label="Alunos"
                          description="Notificações para alunos"
                          value={
                            configuracoes?.notificacoes.notificacoesAluno ||
                            false
                          }
                          onChange={(value) =>
                            setConfiguracoes((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    notificacoes: {
                                      ...prev.notificacoes,
                                      notificacoesAluno: value,
                                    },
                                  }
                                : null
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Teste de Notificações
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            toast.success("Notificação de sucesso enviada!");
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                          Teste Sucesso
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            toast.error("Notificação de erro enviada!");
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                          Teste Erro
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            toast("Notificação informativa enviada!", {
                              icon: "ℹ",
                            });
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                          Teste Info
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {abaAtiva === "tema" && (
                <motion.div
                  key="tema"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Palette className="mr-3" size={28} />
                    Configurações de Tema
                  </h2>

                  <div className="space-y-8">
                    {/* Modo Escuro/Claro */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Modo de Exibição
                      </h3>
                      <ConfigToggle
                        label="Modo Escuro"
                        description="Ativar tema escuro para melhor experiência visual"
                        value={configuracoes?.tema.modoEscuro || false}
                        onChange={(value) =>
                          setConfiguracoes((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  tema: { ...prev.tema, modoEscuro: value },
                                }
                              : null
                          )
                        }
                      />
                    </div>

                    {/* Cores do Tema */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Cores do Tema
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white text-sm font-medium mb-3">
                            Cor Primária
                          </label>
                          <div className="flex space-x-3">
                            {[
                              "#3B82F6", // Blue
                              "#8B5CF6", // Purple
                              "#10B981", // Green
                              "#F59E0B", // Yellow
                              "#EF4444", // Red
                              "#EC4899", // Pink
                            ].map((color) => (
                              <motion.button
                                key={color}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  setConfiguracoes((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          tema: {
                                            ...prev.tema,
                                            corPrimaria: color,
                                          },
                                        }
                                      : null
                                  )
                                }
                                className={`w-12 h-12 rounded-full border-2 transition-all ${
                                  configuracoes?.tema.corPrimaria === color
                                    ? "border-white scale-110"
                                    : "border-gray-600 hover:border-gray-400"
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-white text-sm font-medium mb-3">
                            Cor Secundária
                          </label>
                          <div className="flex space-x-3">
                            {[
                              "#8B5CF6", // Purple
                              "#3B82F6", // Blue
                              "#F59E0B", // Yellow
                              "#10B981", // Green
                              "#EC4899", // Pink
                              "#EF4444", // Red
                            ].map((color) => (
                              <motion.button
                                key={color}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  setConfiguracoes((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          tema: {
                                            ...prev.tema,
                                            corSecundaria: color,
                                          },
                                        }
                                      : null
                                  )
                                }
                                className={`w-12 h-12 rounded-full border-2 transition-all ${
                                  configuracoes?.tema.corSecundaria === color
                                    ? "border-white scale-110"
                                    : "border-gray-600 hover:border-gray-400"
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tipografia */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Tipografia
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ConfigSelect
                          label="Fonte Principal"
                          value={configuracoes?.tema.fontePrincipal || ""}
                          options={[
                            { value: "Inter", label: "Inter (Moderno)" },
                            { value: "Roboto", label: "Roboto (Clean)" },
                            {
                              value: "Open Sans",
                              label: "Open Sans (Legível)",
                            },
                            { value: "Poppins", label: "Poppins (Elegante)" },
                            {
                              value: "Montserrat",
                              label: "Montserrat (Profissional)",
                            },
                          ]}
                          onChange={(value) =>
                            setConfiguracoes((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    tema: {
                                      ...prev.tema,
                                      fontePrincipal: value,
                                    },
                                  }
                                : null
                            )
                          }
                        />
                        <ConfigSelect
                          label="Tamanho da Fonte"
                          value={configuracoes?.tema.tamanhoFonte || ""}
                          options={[
                            { value: "small", label: "Pequeno" },
                            { value: "medium", label: "Médio" },
                            { value: "large", label: "Grande" },
                            { value: "xlarge", label: "Extra Grande" },
                          ]}
                          onChange={(value) =>
                            setConfiguracoes((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    tema: { ...prev.tema, tamanhoFonte: value },
                                  }
                                : null
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Preview do Tema */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Preview do Tema
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white text-center">
                          <div className="text-lg font-bold mb-2">
                            Tema Azul
                          </div>
                          <div className="text-sm opacity-80">
                            Moderno e Profissional
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-4 text-white text-center">
                          <div className="text-lg font-bold mb-2">
                            Tema Verde
                          </div>
                          <div className="text-sm opacity-80">
                            Fresco e Natural
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white text-center">
                          <div className="text-lg font-bold mb-2">
                            Tema Roxo
                          </div>
                          <div className="text-sm opacity-80">
                            Elegante e Criativo
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Ações do Tema */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Ações do Tema
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            // Reset para tema padrão
                            setConfiguracoes((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    tema: {
                                      modoEscuro: true,
                                      corPrimaria: "#3B82F6",
                                      corSecundaria: "#8B5CF6",
                                      fontePrincipal: "Inter",
                                      tamanhoFonte: "medium",
                                    },
                                  }
                                : null
                            );
                            toast.success("Tema resetado para padrão!");
                          }}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                          Resetar Tema
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            toast.success("Tema aplicado com sucesso!");
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                          Aplicar Tema
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            toast.success("Tema exportado!");
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-colors">
                          Exportar Tema
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {abaAtiva === "sistema" && (
                <motion.div
                  key="sistema"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Server className="mr-3" size={28} />
                    Informações do Sistema
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SystemMetricCard
                      icon={<Cpu className="text-blue-400" size={24} />}
                      label="CPU"
                      value={sistemaInfo.cpu}
                      color="from-blue-500 to-blue-600"
                    />
                    <SystemMetricCard
                      icon={<Cpu className="text-green-400" size={24} />} // Substituindo Memory por Cpu para evitar erro de importação
                      label="Memória"
                      value={sistemaInfo.memoria}
                      color="from-green-500 to-green-600"
                    />
                    <SystemMetricCard
                      icon={<HardDrive className="text-purple-400" size={24} />}
                      label="Disco"
                      value={sistemaInfo.disco}
                      color="from-purple-500 to-purple-600"
                    />
                    <SystemMetricCard
                      icon={<Wifi className="text-yellow-400" size={24} />}
                      label="Rede"
                      value={sistemaInfo.rede}
                      color="from-yellow-500 to-yellow-600"
                    />
                    <SystemMetricCard
                      icon={<Clock className="text-red-400" size={24} />}
                      label="Uptime"
                      value={sistemaInfo.uptime}
                      color="from-red-500 to-red-600"
                    />
                    <SystemMetricCard
                      icon={<Zap className="text-indigo-400" size={24} />}
                      label="Versão"
                      value={sistemaInfo.versao}
                      color="from-indigo-500 to-indigo-600"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function ConfigInput({
  label,
  value,
  onChange,
  type = "text",
  showPassword,
  onTogglePassword,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

function ConfigSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ConfigToggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
      <div>
        <h3 className="text-white font-medium">{label}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? "bg-blue-500" : "bg-gray-600"
        }`}>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ConfigNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function SystemMetricCard({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        {icon}
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className="text-white/80 text-sm font-medium">{label}</div>
    </motion.div>
  );
}
