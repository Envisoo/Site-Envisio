export const rentingFeatures: Record<
  string,
  {
    abas: string[];
    dados: Record<
      string,
      {
        lista: { titulo: string; descricao: string }[];
        imagem: string;
      }
    >;
  }
> = {
  impressoras: {
    abas: ["IMPRIMIR", "CÓPIA", "DIGITALIZAR", "CAIXA", "FAX", "ACABAMENTO"],
    dados: {
      IMPRIMIR: {
        imagem: "/imagens/impressora/imprimir.jpg",
        lista: [
          {
            titulo: "Impressão de cópia carbono",
            descricao: "Impressão de página única a partir de várias bandejas",
          },
          {
            titulo: "Modo de economia de toner",
            descricao:
              "Ajuda a economizar toner reduzindo o consumo de toner, por exemplo, para rascunhos de impressão",
          },
          {
            titulo: "Impressão direta",
            descricao:
              "Impressão sem driver de PDF, XPS, DOCX, XLSX, PPTX, JPEG, TIFF, PS e PCL",
          },
          {
            titulo: "Impressão móvel",
            descricao:
              "Possibilidade de imprimir documentos diretamente de um dispositivo móvel",
          },
          {
            titulo: "Minha guia",
            descricao: "Personalização do driver de impressão",
          },
          {
            titulo: "Fila de tarefas inteligentes",
            descricao:
              "Trabalhos não imprimíveis, como tamanho de papel indisponível, são ignorados automaticamente",
          },
        ],
      },
      CÓPIA: {
        imagem: "/imagens/impressora/copia.jpg",
        lista: [
          { titulo: "Função A", descricao: "Descrição da função A" },
          { titulo: "Função B", descricao: "Descrição da função B" },
        ],
      },
      DIGITALIZAR: {
        imagem: "/imagens/impressora/digitalizar.jpg",
        lista: [
          { titulo: "Digitalização rápida", descricao: "Alta velocidade" },
        ],
      },
      CAIXA: {
        imagem: "/imagens/impressora/caixa.jpg",
        lista: [],
      },
      FAX: {
        imagem: "/imagens/impressora/fax.jpg",
        lista: [],
      },
      ACABAMENTO: {
        imagem: "/imagens/impressora/acabamento.jpg",
        lista: [],
      },
    },
  },

  // computadores continua como antes
 computadores: {
  abas: ["GERAL", "FORMATAÇÃO", "SOFTWARE", "MANUTENÇÃO", "REDES", "ACESSÓRIOS"],
  dados: {
    GERAL: {
      imagem: "/imagens/computador/geral.jpg",
      lista: [
        { titulo: "Formatação", descricao: "Reinstalação completa do sistema operacional" },
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
      imagem: "/imagens/computador/formatacao.jpg",
      lista: [
        { titulo: "Backup e Restauração", descricao: "Cópia de segurança dos seus dados antes da formatação" },
        { titulo: "Instalação limpa", descricao: "Formatação com instalação nova do Windows/Linux" },
        { titulo: "Drivers atualizados", descricao: "Instalação de todos os drivers essenciais" },
      ],
    },
    SOFTWARE: {
      imagem: "/imagens/computador/software.jpg",
      lista: [
        { titulo: "Office / LibreOffice", descricao: "Instalação de suítes de escritório completas" },
        { titulo: "Navegadores", descricao: "Chrome, Firefox, Edge, Opera, Brave..." },
        { titulo: "Antivírus", descricao: "Instalação de antivírus gratuito ou pago" },
      ],
    },
    MANUTENÇÃO: {
      imagem: "/imagens/computador/manutencao.jpg",
      lista: [
        { titulo: "Limpeza interna", descricao: "Remoção de poeira e reaplicação de pasta térmica" },
        { titulo: "Diagnóstico de hardware", descricao: "Verificação de disco, memória, placa-mãe e processador" },
        { titulo: "Substituição de peças", descricao: "Troca de HD, SSD, memória, fonte, etc." },
      ],
    },
    REDES: {
      imagem: "/imagens/computador/redes.jpg",
      lista: [
        { titulo: "Configuração de Wi-Fi", descricao: "Conexão, nome da rede, senha e segurança" },
        { titulo: "Compartilhamento", descricao: "Impressoras e arquivos na rede local" },
        { titulo: "Diagnóstico de rede", descricao: "Resolução de problemas de conectividade" },
      ],
    },
    ACESSÓRIOS: {
      imagem: "/imagens/computador/acessorios.jpg",
      lista: [
        { titulo: "Instalação de periféricos", descricao: "Teclado, mouse, webcam, monitores extras..." },
        { titulo: "Configuração de impressora", descricao: "Instalação e ajustes de impressoras locais ou em rede" },
      ],
    },
  },
},
};
