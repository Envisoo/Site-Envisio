<!-- @format -->

# Frontend Site-Envisio

## 📱 Visão Geral

Interface web do site institucional e plataforma de ensino online da Envisio, construída com React e TypeScript.

## 🚀 Tecnologias Principais

- React 18
- TypeScript
- TailwindCSS
- Axios
- React Router DOM v6
- Postmark

## 💻 Pré-requisitos

- Node.js v16+
- npm ou yarn
- Conexão com backend

## 🔧 Instalação e Execução

1. **Instale as dependências:**

```bash
npm install
```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=https://site-envisio-producao-1d15.up.railway.app

REACT_APP_POSTMARK_TOKEN=seu_token_aqui
```

3. **Execute o projeto:**

```bash
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── services/           # Serviços e API
├── styles/             # Estilos globais
├── utils/              # Funções utilitárias
└── App.tsx             # Componente principal
```

## 📋 Scripts Disponíveis

- **Desenvolvimento:**

```bash
npm start
```

- **Build de Produção:**

```bash
npm run build
```

- **Testes:**

```bash
npm test
```

- **Lint:**

```bash
npm run lint
```

## 🎨 Componentes Principais

### Páginas

- Home
- Sobre
- Cursos
- Blog
- Contato
- Área do Aluno
- Dashboard Admin

### Funcionalidades

- ✅ Sistema de autenticação
- ✅ Área administrativa
- ✅ Gerenciamento de cursos
- ✅ Formulário de contato
- ✅ Upload de arquivos
- ✅ Sistema de pagamentos
- ✅ Perfil do usuário
- ✅ Emissão de certificados

## 📱 Responsividade

- Layout adaptativo para dispositivos móveis
- Breakpoints personalizados
- Otimizado para tablets e smartphones

## 🔒 Segurança

- Autenticação JWT
- Proteção de rotas
- Validação de formulários
- Sanitização de dados

## 📤 Deploy

Para fazer deploy em produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `build/`

## 🐛 Debugging

1. Use o React Developer Tools
2. Console do navegador
3. VSCode debugger

## 📚 Documentação Adicional

- [Create React App](https://create-react-app.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

## 🤝 Contribuição

1. Faça um Fork
2. Crie sua Feature Branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: MinhaFeature'`)
4. Push para a Branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 👥 Autores

- Teodoro Pedro

## 📞 Suporte

- Email: teodorop990@gmail.com
- LinkedIn: [Teodoro Pedro](https://www.linkedin.com/in/teodoro-pedro-6a075b28a/)
