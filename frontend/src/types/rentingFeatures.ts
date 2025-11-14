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
