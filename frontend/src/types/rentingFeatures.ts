export interface FeatureItem {
  titulo: string;
  descricao: string;
}
interface FeatureData {
  lista: FeatureItem[];
}

interface RentingFeature {
  abas: string[];
  dados: Record<string, FeatureData>;
}

export const rentingFeatures: Record<string, RentingFeature> = {
  bizhubC301i: {
    abas: ["IMPRIMIR", "CÓPIA", "DIGITALIZAR", "SEGURANÇA", "ACABAMENTO"],
    dados: {
      IMPRIMIR: {
      lista: [
        {
          titulo: "Impressão em cópia carbono",
          descricao: "Impressão de página única a partir de várias bandejas"
        },
        {
          titulo: "Modo de economia de toner",
          descricao: "Ajuda a economizar toner, reduzindo o consumo, por exemplo, em impressões de rascunho"
        },
        {
          titulo: "Impressão direta",
          descricao: "Impressão sem driver de PDF, XPS, DOCX, XLSX, PPTX, JPEG, TIFF, PS e PCL"
        },
        {
          titulo: "Impressão móvel",
          descricao: "Possibilidade de imprimir documentos diretamente de um dispositivo móvel"
        },
        {
          titulo: "Meu Tab",
          descricao: "Personalização do driver de impressão"
        },
        {
          titulo: "Fila de tarefas inteligente",
          descricao: "Tarefas que não podem ser impressas são ignoradas pelas tarefas subsequentes"
        }
      ]
    },
    CÓPIA: {
      lista: [
        {
          titulo: "Foto de carta",
          descricao: "Imprime cópias da frente e do verso do original na mesma página, por exemplo, para passaporte e outros documentos de identificação"
        },
        {
          titulo: "Barra de funções personalizada",
          descricao: "É possível selecionar livremente até 2 funções de cópia de 7x2 na tela principal de cópia"
        },
        {
          titulo: "Prévia do trabalho",
          descricao: "Ilustra as funções de cópia selecionadas na tela"
        },
        {
          titulo: "Remoção de página em branco",
          descricao: "Exclusão automática de páginas em branco, por exemplo, ao copiar documentos com impressão frente e verso automática"
        }
      ]
    },
    DIGITALIZAR: {
      lista: [
        {
          titulo: "Foto de carta",
          descricao: "Digitalização da frente e do verso do original na mesma página, ideal para documentos de identificação"
        },
        {
          titulo: "Barra de funções personalizada",
          descricao: "Permite acesso rápido às funções de digitalização mais usadas"
        },
        {
          titulo: "Prévia do trabalho",
          descricao: "Visualização das configurações de digitalização antes do processamento"
        },
        {
          titulo: "Remoção de página em branco",
          descricao: "Exclusão automática de páginas em branco durante a digitalização"
        }
      ]
    },
    SEGURANÇA: {
      lista: [
        {
          titulo: "Direitos de acesso",
          descricao: "Os direitos de acesso às funções podem ser concedidos em nível de usuário (até 1.000 contas na MFP)"
        },
        {
          titulo: "Autenticação",
          descricao: "Acesso do usuário por senha, nome de usuário + senha, cartão de identificação ou leitor de veias da impressão digital"
        },
        {
          titulo: "Serviços SEGUROS bizhub",
          descricao: "Configure a MFP com segurança para garantir a proteção dos dados da empresa"
        },
        {
          titulo: "Criptografia de dados",
          descricao: "Criptografia de dados armazenados em disco rígido e proteção por senha para acesso ao disco rígido"
        },
        {
          titulo: "Antivírus integrado",
          descricao: "Monitoramento em tempo real do status de verificação de vírus com informações detalhadas sobre ameaças"
        },
        {
          titulo: "Ferramenta de apagamento de dados",
          descricao: "Apaga todos os dados do SSD quando o dispositivo chega ao fim de sua vida útil, incluindo o firmware do dispositivo"
        },
        {
          titulo: "Proteção contra ataques",
          descricao: "Detecção e notificação de tentativas de ataque de senha e acessos não autorizados"
        }
      ]
    },
    ACABAMENTO: {
      lista: [
        {
          titulo: "Opções de acabamento",
          descricao: "Grampeamento, perfuração, dobra de carta"
        },
        {
          titulo: "Capacidade de grampeamento",
          descricao: "Até 50 folhas (80 g/m²)"
        }
      ]
    }
      // Adicione as outras abas com suas respectivas listas
    },
  },
  
  bizhub4051i: {
    abas: ["IMPRIMIR", "CÓPIA", "DIGITALIZAR", "SEGURANÇA", "ACABAMENTO"],
    dados: {
      IMPRIMIR: {
        lista: [
          {
            titulo: "Impressão direta",
            descricao: "Impressão sem driver de PDF, XPS, DOCX, XLSX, PPTX, JPEG, TIFF, PS e PCL",
          },
          {
            titulo: "Impressão móvel",
            descricao: "Possibilidade de imprimir documentos diretamente de um dispositivo móvel",
          },
          {
            titulo: "Meu Tab",
            descricao: "Personalização do driver de impressão",
          },
          {
            titulo: "Fila de tarefas inteligente",
            descricao: "Tarefas que não podem ser impressas, por exemplo, devido à indisponibilidade do tamanho do papel (cópia, impressão e fax), são ignoradas pelas tarefas subsequentes",
          },
          {
            titulo: "Driver de impressora universal",
            descricao: "Um único driver para instalar, gerenciar e manter",
          },
          {
            titulo: "Tamanho do papel",
            descricao: "A3 a A5, tamanhos personalizados",
          },
          {
            titulo: "Modo de economia de tôner",
            descricao: "Reduz o consumo de tôner para impressões de rascunho",
          }
        ]
      },
            CÓPIA: {
        lista: [
          {
            titulo: "Remoção de página em branco",
            descricao: "Exclusão automática de páginas em branco, por exemplo, ao copiar documentos com impressão frente e verso automática"
          },
          {
            titulo: "Nova interface de usuário",
            descricao: "Interface de usuário leve, simples e moderna, fácil de usar"
          },
          {
            titulo: "Acesso rápido às configurações",
            descricao: "Com as configurações mais usadas visíveis à primeira vista, selecione-as com um clique, menu suspenso ou menu pop-up"
          }
        ]
      },
      DIGITALIZAR: {
        lista: [
          {
            titulo: "Anotação de digitalização",
            descricao: "Carimbo com data/hora, número de arquivo ou texto personalizado em digitalizações para fins de arquivamento"
          },
          {
            titulo: "Pré-visualização da digitalização",
            descricao: "Fornece uma pré-visualização em tempo real dos originais digitalizados para verificação antes do envio"
          },
          {
            titulo: "Programas de digitalização",
            descricao: "Pré-configuração do arquivo original, do arquivo de digitalização e do destino para tarefas de digitalização regulares"
          },
          {
            titulo: "Escanear para URL",
            descricao: "Reduza a carga na rede da empresa enviando um URL simples ao destinatário em vez de um arquivo grande"
          },
          {
            titulo: "Digitalizar para mim/Página inicial",
            descricao: "Digitalização direta para o próprio endereço de e-mail (Eu) ou pasta SMB (Home) com base nas informações do Active Directory"
          }
        ]
      },
      SEGURANÇA: {
        lista: [
          {
            titulo: "Direitos de acesso",
            descricao: "Os direitos de acesso às funções podem ser concedidos em nível de usuário (até 1.000 contas na MFP)"
          },
          {
            titulo: "Autenticação",
            descricao: "Acesso do usuário por senha, nome de usuário + senha, cartão de identificação ou leitor de veias da impressão digital"
          },
          {
            titulo: "Serviços SEGUROS bizhub",
            descricao: "Ative os recursos de segurança adequados na MFP para garantir a segurança dos dados corporativos"
          },
          {
            titulo: "Criptografia de dados",
            descricao: "Criptografia de dados armazenados em disco rígido e proteção por senha para acesso ao disco rígido"
          },
          {
            titulo: "Antivírus integrado (opcional)",
            descricao: "Mecanismo antivírus Bitdefender que protege contra a propagação de vírus dentro e fora da organização, com monitoramento em tempo real"
          },
          {
            titulo: "Exclusão temporária de dados",
            descricao: "Dados de trabalhos de cópia, impressão, digitalização e fax são apagados automaticamente após a conclusão do trabalho"
          },
          {
            titulo: "Ferramenta de apagamento de dados",
            descricao: "Apaga todos os dados do SSD quando o dispositivo chega ao fim de sua vida útil, incluindo o firmware do dispositivo"
          }
        ]
      },
      ACABAMENTO: {
        lista: [
          {
            titulo: "Opções de acabamento",
            descricao: "Grampeamento, perfuração, dobra de carta (até 3 folhas)",
          },
          {
            titulo: "Criação de livretos",
            descricao: "Até 20 folhas (80 páginas) por livreto",
          },
        ],
      },
      // Adicione as outras abas com suas respectivas listas
    },
  },
  
  // Modelos antigos mantidos por compatibilidade - podem ser removidos posteriormente
  bizhubC3350i: {
    abas: ["IMPRIMIR", "CÓPIA", "DIGITALIZAR", "CAIXA", "FAX", "ACABAMENTO"],
    dados: {
      IMPRIMIR: {
        lista: [
          {
            titulo: "Impressão de alta velocidade",
            descricao: "Velocidade de até 75 páginas por minuto (A4)",
          },
          {
            titulo: "Resolução de impressão",
            descricao: "1,800 x 600 dpi; 1,200 x 1,200 dpi",
          },
          {
            titulo: "Recursos avançados",
            descricao: "Impressão duplex automática, várias páginas por folha (N-up)",
          },
          {
            titulo: "Suporte a múltiplos formatos",
            descricao: "PCL 6 (XL 3.0); PCL 5; PostScript 3 (CPSI 3016); XPS",
          },
          {
            titulo: "Impressão móvel",
            descricao: "AirPrint (iOS), Mopria (Android), Google Cloud Print, intranet móvel e Wi-Fi Direct",
          },
          {
            titulo: "Capacidade de papel",
            descricao: "Padrão: 3,650 folhas / Máximo: 6,650 folhas",
          },
        ],
      },
      CÓPIA: {
        lista: [
          {
            titulo: "Velocidade de cópia",
            descricao: "Até 75 cpm (cópias por minuto) em A4",
          },
          {
            titulo: "Resolução de cópia",
            descricao: "600 x 600 dpi",
          },
          {
            titulo: "Gradação",
            descricao: "256 gradações",
          },
          {
            titulo: "Múltiplas cópias",
            descricao: "1-9,999",
          },
          {
            titulo: "Recursos de cópia",
            descricao: "Capítulo, inserção de capa e página, cópia de teste, ajuste de imagem, modo poster",
          },
        ],
      },
      DIGITALIZAR: {
        lista: [
          {
            titulo: "Velocidade de digitalização",
            descricao: "Até 240 ipm (imagens por minuto) em cores e P&B",
          },
          {
            titulo: "Resolução de digitalização",
            descricao: "Máximo: 600 x 600 dpi",
          },
          {
            titulo: "Formatos de digitalização",
            descricao: "TIFF, PDF, PDF compacto, JPEG, XPS, XPS compacto, PPTX, DOCX, XLSX, PDF pesquisável, PDF/A, PDF linearizado",
          },
          {
            titulo: "Destinos de digitalização",
            descricao: "Email, SMB, FTP, USB, WebDAV, URL, DPWS",
          },
        ],
      },
      CAIXA: {
        lista: [
          {
            titulo: "Armazenamento de documentos",
            descricao: "Até 3,000 documentos ou 10,000 páginas",
          },
          {
            titulo: "Tipos de caixa",
            descricao: "Pública, pessoal (com senha), grupo (com autenticação)",
          },
          {
            titulo: "Funcionalidades da caixa",
            descricao: "Reimpressão, combinação, download, envio (email, FTP, SMB e fax), cópia entre caixas",
          },
        ],
      },
      FAX: {
        lista: [
          {
            titulo: "Fax Super G3",
            descricao: "Transmissão digital, velocidade de 33.6 Kbps",
          },
          {
            titulo: "Resolução de fax",
            descricao: "Máximo: 600 x 600 dpi (ultra-fino)",
          },
          {
            titulo: "Compressão",
            descricao: "MH, MR, MMR, JBIG",
          },
          {
            titulo: "Recursos de fax",
            descricao: "PC-Fax, polling, encaminhamento, agenda telefônica",
          },
        ],
      },
      ACABAMENTO: {
        lista: [
          {
            titulo: "Modos de finalização",
            descricao: "Offset, grupo, classificação, grampeamento, perfuração, dobra central, dobra carta, dobra tripla",
          },
          {
            titulo: "Capacidade de grampeamento",
            descricao: "Até 100 folhas ou 94 folhas + 2 folhas de capa (até 209 g/m²)",
          },
          {
            titulo: "Capacidade de saída",
            descricao: "Máximo: 3,300 folhas",
          },
          {
            titulo: "Dobra",
            descricao: "Dobra central, dobra carta, dobra tripla, dobra em Z",
          },
        ],
      },
    },
  },


  bizhubC250i : {
    abas: ["IMPRIMIR", "CÓPIA", "DIGITALIZAR", "CAIXA", "FAX", "ACABAMENTO"],
    dados: {
      IMPRIMIR: {
        lista: [
          {
            titulo: "Velocidade de Impressão",
            descricao: "75 páginas por minuto (A4)"
          },
          {
            titulo: "Resolução",
            descricao: "1800 x 600 dpi, 1200 x 1200 dpi"
          },
          {
            titulo: "Formatos",
            descricao: "A6 até SRA3, formatos personalizados"
          },
          {
            titulo: "Capacidade",
            descricao: "Padrão: 3,650 folhas / Máximo: 6,650 folhas"
          }
        ]
      },
      CÓPIA: {
        lista: [
          {
            titulo: "Velocidade",
            descricao: "75 cópias por minuto"
          },
          {
            titulo: "Resolução",
            descricao: "600 x 600 dpi"
          },
          {
            titulo: "Gradação",
            descricao: "256 níveis"
          }
        ]
      },
      DIGITALIZAR: {
        lista: [
          {
            titulo: "Velocidade",
            descricao: "Até 240 originais por minuto com dual scan"
          },
          {
            titulo: "Resolução",
            descricao: "600 x 600 dpi"
          },
          {
            titulo: "Formatos",
            descricao: "TIFF, PDF, PDF/A, PDF compacto, JPEG, XPS, PPTX, DOCX, XLSX"
          }
        ]
      },
      CAIXA: {
        lista: [
          {
            titulo: "Armazenamento de documentos",
            descricao: "Até 3,000 documentos ou 10,000 páginas",
          },
          {
            titulo: "Tipos de caixa",
            descricao: "Pública, pessoal (com senha), grupo (com autenticação)",
          },
          {
            titulo: "Funcionalidades da caixa",
            descricao: "Reimpressão, combinação, download, envio (email, FTP, SMB e fax), cópia entre caixas",
          },
        ],
      },
      FAX: {
        lista: [
          {
            titulo: "Fax Super G3",
            descricao: "Transmissão digital, velocidade de 33.6 Kbps",
          },
          {
            titulo: "Resolução de fax",
            descricao: "Máximo: 600 x 600 dpi (ultra-fino)",
          },
          {
            titulo: "Compressão",
            descricao: "MH, MR, MMR, JBIG",
          },
          {
            titulo: "Recursos de fax",
            descricao: "PC-Fax, polling, encaminhamento, agenda telefônica",
          },
        ],
      },
      ACABAMENTO: {
        lista: [
          {
            titulo: "Grampeamento",
            descricao: "100 folhas ou 94 folhas + 2 capas"
          },
          {
            titulo: "Dobra",
            descricao: "Dobra central, carta, tripla e em Z"
          },
          {
            titulo: "Capacidade de Saída",
            descricao: "Máximo: 3,300 folhas"
          }
        ]
      }
    }
  },
  computadores: {
    abas: ["GERAL", "FORMATAÇÃO", "SOFTWARE", "MANUTENÇÃO", "ACESSÓRIOS"],
    dados: {
      GERAL: {
        lista: [
          {
            titulo: "Processador",
            descricao: "Intel de última geração"
          },
          {
            titulo: "Memória RAM",
            descricao: "8GB/32GB"
          },
          {
            titulo: "Armazenamento",
            descricao: "SSD NVMe de alta velocidade"
          }
        ]
      },
      FORMATAÇÃO: {
        lista: [
          {
            titulo: "Windows",
            descricao: "Windows 11 Pro licenciado"
          },
          {
            titulo: "Backup",
            descricao: "Backup completo antes da formatação"
          }
        ]
      },
      SOFTWARE: {
        lista: [
          {
            titulo: "Pacote Office",
            descricao: "Microsoft 365 ou LibreOffice"
          },
          {
            titulo: "Antivírus",
            descricao: "Solução empresarial com console de gerenciamento"
          }
        ]
      },
      MANUTENÇÃO: {
        lista: [
          {
            titulo: "Preventiva",
            descricao: "Manutenção trimestral agendada"
          },
          {
            titulo: "Corretiva",
            descricao: "Atendimento em até 4 horas úteis"
          }
        ]
      },
      ACESSÓRIOS: {
        lista: [
          {
            titulo: "Monitor",
            descricao: "Full HD ou 4K com ajuste de altura"
          },
          {
            titulo: "Periféricos",
            descricao: "Teclado e mouse sem fio profissionais"
          }
        ]
      }
    }
  },
  servidores: {
    abas: ["HARDWARE", "STORAGE", "BACKUP", "MONITORAMENTO", "SUPORTE"],
    dados: {
      HARDWARE: {
        lista: [
          {
            titulo: "Processadores",
            descricao: "De última geração."
          },
          {
            titulo: "Memória RAM",
            descricao: "32GB até 2TB de RAM."
          },
          {
            titulo: "Redundância",
            descricao: "Fontes redundantes hot-swap, ventiladores redundantes"
          },
          {
            titulo: "Conectividade",
            descricao: "Interfaces de rede 10GbE"
          }
        ]
      },
      STORAGE: {
        lista: [
          {
            titulo: "Armazenamento",
            descricao: "Arrays de discos SSD NVMe em RAID para máxima performance"
          },
          {
            titulo: "Capacidade",
            descricao: "Configurável de 1TB até 100TB+ com expansão hot-plug"
          },
          {
            titulo: "RAID",
            descricao: "Suporte a RAID 0, 1, 5, 6, 10 com controladoras redundantes"
          }
        ]
      },
      BACKUP: {
        lista: [
          {
            titulo: "Local",
            descricao: "Backup incremental diário com retenção configurável"
          },
          {
            titulo: "Cloud",
            descricao: "Replicação automática para nuvem com criptografia"
          },
          {
            titulo: "Disaster Recovery",
            descricao: "Plano de recuperação de desastres com RTO e RPO definidos"
          }
        ]
      },
      MONITORAMENTO: {
        lista: [
         
          {
            titulo: "Alertas",
            descricao: "Notificações em tempo real via email, SMS"
          },
          {
            titulo: "Relatórios",
            descricao: "Reports mensais de disponibilidade e performance"
          }
        ]
      },
      SUPORTE: {
        lista: [
          
          {
            titulo: "Manutenção",
            descricao: "Preventiva mensal e corretiva sob demanda"
          },
          {
            titulo: "Gestão",
            descricao: "Gestão proativa de capacidade e performance"
          }
        ]
      }
    }
  }
};
