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
  impressoras: {
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

  // computadores continua como antes
 computadores: {
  abas: ["GERAL", "FORMATAÇÃO", "SOFTWARE", "MANUTENÇÃO", "ACESSÓRIOS"],
  dados: {
    GERAL: {
      lista: [
        { 
          titulo: "Formatação", 
          descricao: "Reinstalação completa do sistema operacional" },
        {
          titulo: "Instalação de drivers",
          descricao: "Drivers de dispositivos, impressoras, placas e mais",
        },
        {
          titulo: "Otimização do sistema",
          descricao: "Limpeza de arquivos temporários e inicialização rápida",
        },
      ],
    },
    FORMATAÇÃO: {
      lista: [
        { 
          titulo: "Backup e Restauração", 
          descricao: "Cópia de segurança dos seus dados antes da formatação" },
        { 
          titulo: "Instalação limpa", 
          descricao: "Formatação com instalação nova do Windows/Linux" },
        { 
          titulo: "Drivers atualizados", 
          descricao: "Instalação de todos os drivers essenciais" },
      ],
    },
    SOFTWARE: {
      lista: [
        { titulo: "Office / LibreOffice", descricao: "Instalação de suítes de escritório completas" },
        { titulo: "Navegadores", descricao: "Chrome, Firefox, Edge, Opera, Brave..." },
        { titulo: "Antivírus", descricao: "Instalação de antivírus gratuito ou pago" },
      ],
    },
    MANUTENÇÃO: {
      lista: [
        { titulo: "Limpeza interna", descricao: "Remoção de poeira e reaplicação de pasta térmica" },
        { titulo: "Diagnóstico de hardware", descricao: "Verificação de disco, memória, placa-mãe e processador" },
        { titulo: "Substituição de peças", descricao: "Troca de HD, SSD, memória, fonte, etc." },
      ],
    },
    ACESSÓRIOS: {
      lista: [
        { titulo: "Instalação de periféricos", descricao: "Teclado, mouse, webcam, monitores extras..." },
        { titulo: "Configuração de impressora", descricao: "Instalação e ajustes de impressoras locais ou em rede" },
      ],
    },
  },

  // Remove 'servidores' from inside 'computadores' and add it as a top-level property below
  
  },
  
  servidores: {
    abas: ["HARDWARE", "STORAGE", "BACKUP", "MONITORAMENTO", "SUPORTE"],
    dados: {
      HARDWARE: {
        lista: [
          {
            titulo: "Processadores",
            descricao: "Intel Xeon Scalable de última geração com até 40 cores por CPU"
          },
          {
            titulo: "Memória RAM",
            descricao: "32GB até 2TB de RAM ECC DDR4"
          },
          {
            titulo: "Redundância",
            descricao: "Fontes redundantes hot-swap, ventiladores redundantes"
          },
          {
            titulo: "Conectividade",
            descricao: "Interfaces de rede 10GbE, suporte a fibra ótica"
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
          },
          {
            titulo: "Cache",
            descricao: "Cache de escrita com bateria de backup"
          }
        ]
      },
      BACKUP: {
        lista: [
          {
            titulo: "Backup Local",
            descricao: "Backup incremental diário com retenção configurável"
          },
          {
            titulo: "Backup em Nuvem",
            descricao: "Replicação automática para nuvem com criptografia"
          },
          {
            titulo: "Disaster Recovery",
            descricao: "Plano de recuperação de desastres com RTO e RPO definidos"
          },
          {
            titulo: "Snapshots",
            descricao: "Snapshots incrementais a cada 4 horas"
          }
        ]
      },
      MONITORAMENTO: {
        lista: [
          {
            titulo: "Monitoramento 24/7",
            descricao: "Monitoramento proativo de hardware e serviços"
          },
          {
            titulo: "Alertas",
            descricao: "Alertas em tempo real via email, SMS e dashboard"
          },
          {
            titulo: "Métricas",
            descricao: "Coleta e análise de métricas de performance"
          },
          {
            titulo: "Reports",
            descricao: "Relatórios mensais de disponibilidade e performance"
          }
        ]
      },
      SUPORTE: {
        lista: [
          {
            titulo: "SLA",
            descricao: "Atendimento 24/7 com SLA de 4 horas para incidentes críticos"
          },
          {
            titulo: "Manutenção",
            descricao: "Manutenção preventiva mensal e corretiva sob demanda"
          },
          {
            titulo: "Gestão",
            descricao: "Gestão proativa de capacidade e performance"
          },
          {
            titulo: "Atualizações",
            descricao: "Patches de segurança e atualizações de firmware"
          }
        ]
      }
    }
  },
}

