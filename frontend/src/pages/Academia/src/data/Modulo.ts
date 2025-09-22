import { Modulo } from '../tipos/Curso';

// Dicionário de módulos por curso (preencha com os IDs reais dos seus cursos)
export const modulosPorCurso: Record<string, Modulo[]> = {
  // Conteúdo específico para o curso Node.js Backend
  "nodejs-backend": [
    {
      id: "mod-node-1",
      titulo: "Módulo 1: Fundamentos do Node.js",
      ordem: 1,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "node-a1", titulo: "O que é Node.js?", tipo: "material", duracao: "45 min" },
        { id: "node-a2", titulo: "Event Loop e Assíncrono", tipo: "material", duracao: "1h 10m" },
        { id: "node-a3", titulo: "NPM e Scripts", tipo: "material", duracao: "40 min" },
      ],
    },
    {
      id: "mod-node-2",
      titulo: "Módulo 2: API REST com Express",
      ordem: 2,
      duracaoTotal: "3 semanas",
      aulas: [
        { id: "node-a4", titulo: "Rotas e Middlewares", tipo: "material", duracao: "1h 20m" },
        { id: "node-a5", titulo: "Controllers e Services", tipo: "material", duracao: "1h 05m" },
        { id: "node-a6", titulo: "Validação e Erros", tipo: "material", duracao: "55 min" },
      ],
    },
    {
      id: "mod-node-3",
      titulo: "Módulo 3: Persistência de Dados (MongoDB)",
      ordem: 3,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "node-a7", titulo: "Modelagem e Mongoose", tipo: "material", duracao: "1h 15m" },
        { id: "node-a8", titulo: "Consultas e Índices", tipo: "material", duracao: "1h 00m" },
      ],
    },
  ],

  // Conteúdo específico para o curso UI/UX Design
  "ui-ux-design": [
    {
      id: "mod-uiux-1",
      titulo: "Módulo 1: Fundamentos de UX",
      ordem: 1,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "uiux-a1", titulo: "Pesquisa com Usuários", tipo: "material", duracao: "50 min" },
        { id: "uiux-a2", titulo: "Personas e Jornada do Usuário", tipo: "material", duracao: "1h 05m" },
      ],
    },
    {
      id: "mod-uiux-2",
      titulo: "Módulo 2: UI e Componentes Visuais",
      ordem: 2,
      duracaoTotal: "3 semanas",
      aulas: [
        { id: "uiux-a3", titulo: "Tipografia, Cores e Espaçamentos", tipo: "material", duracao: "1h 10m" },
        { id: "uiux-a4", titulo: "Design System e Consistência", tipo: "material", duracao: "1h 00m" },
      ],
    },
    {
      id: "mod-uiux-3",
      titulo: "Módulo 3: Protótipos no Figma",
      ordem: 3,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "uiux-a5", titulo: "Wireframes e Fluxos", tipo: "material", duracao: "55 min" },
        { id: "uiux-a6", titulo: "Prototipagem Interativa", tipo: "material", duracao: "1h 20m" },
      ],
    },
  ],

  // Conteúdo específico para Data Analytics com Python
  "data-analytics": [
    {
      id: "mod-da-1",
      titulo: "Módulo 1: Introdução à Análise de Dados",
      ordem: 1,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "da-a1", titulo: "O que é Data Analytics?", tipo: "material", duracao: "40 min" },
        { id: "da-a2", titulo: "Ferramentas do Ecossistema Python", tipo: "material", duracao: "55 min" },
        { id: "da-a3", titulo: "Primeiros Passos com Pandas", tipo: "material", duracao: "1h 15m" },
      ],
    },
    {
      id: "mod-da-2",
      titulo: "Módulo 2: Manipulação e Limpeza de Dados",
      ordem: 2,
      duracaoTotal: "3 semanas",
      aulas: [
        { id: "da-a4", titulo: "Tratamento de Dados Faltantes", tipo: "material", duracao: "1h 00m" },
        { id: "da-a5", titulo: "Transformação e Agregação", tipo: "material", duracao: "1h 10m" },
        { id: "da-a6", titulo: "Juntando DataFrames", tipo: "material", duracao: "50 min" },
      ],
    },
    {
      id: "mod-da-3",
      titulo: "Módulo 3: Visualização e Insights",
      ordem: 3,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "da-a7", titulo: "Matplotlib para Gráficos Básicos", tipo: "material", duracao: "1h 05m" },
        { id: "da-a8", titulo: "Seaborn para Visualizações Avançadas", tipo: "material", duracao: "1h 15m" },
      ],
    },
  ],

  // Conteúdo específico para React Avançado
  "react-avancado": [
    {
      id: "mod-react-1",
      titulo: "Módulo 1: Hooks Avançados",
      ordem: 1,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "react-a1", titulo: "useMemo e useCallback", tipo: "material", duracao: "1h 00m" },
        { id: "react-a2", titulo: "useReducer para Estado Complexo", tipo: "material", duracao: "55 min" },
        { id: "react-a3", titulo: "Hooks Personalizados", tipo: "material", duracao: "45 min" },
      ],
    },
    {
      id: "mod-react-2",
      titulo: "Módulo 2: Performance e Otimização",
      ordem: 2,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "react-a4", titulo: "Code Splitting e Lazy Loading", tipo: "material", duracao: "1h 10m" },
        { id: "react-a5", titulo: "React.memo e PureComponent", tipo: "material", duracao: "50 min" },
        { id: "react-a6", titulo: "Profiler e DevTools", tipo: "material", duracao: "40 min" },
      ],
    },
    {
      id: "mod-react-3",
      titulo: "Módulo 3: Padrões de Arquitetura",
      ordem: 3,
      duracaoTotal: "2 semanas",
      aulas: [
        { id: "react-a7", titulo: "Context API Avançado", tipo: "material", duracao: "1h 05m" },
        { id: "react-a8", titulo: "Render Props e HOCs", tipo: "material", duracao: "1h 00m" },
        { id: "react-a9", titulo: "Compound Components", tipo: "material", duracao: "45 min" },
      ],
    },
  ],
};

// Fallback genérico para quando um curso não possuir módulos definidos
export const modulosDataFallback: Modulo[] = [
  {
    id: 'fallback-1',
    titulo: 'Conteúdo programático em breve',
    ordem: 1,
    duracaoTotal: '-',
    aulas: [],
  },
];