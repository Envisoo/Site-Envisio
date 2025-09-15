<!-- @format -->

# Site-Envisio

## 📋 Sobre o Projeto

Site institucional e sistema de ensino online da Envisio, desenvolvido com React no frontend e Node.js no backend.

## 🚀 Tecnologias Utilizadas

### Frontend

- React.js
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Postmark (para envio de emails)

### Backend

- Node.js
- Express
- PostgreSQL
- JWT para autenticação
- Multer para upload de arquivos
- Bcrypt para criptografia
- Postmark para envio de emails

## 💻 Pré-requisitos

- Node.js v16 ou superior
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm start
```

## 🌐 Variáveis de Ambiente

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_POSTMARK_TOKEN=seu_token_aqui
```

### Backend (.env)

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=seu_segredo_aqui
POSTMARK_SERVER_TOKEN=seu_token_aqui
```

## 📁 Estrutura do Projeto

### Frontend

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
```

### Backend

```
backend/
├── rotas/
├── middlewares/
├── controllers/
├── db/
└── uploads/
```

## 🛠️ Funcionalidades

- ✅ Sistema de autenticação
- ✅ Área administrativa
- ✅ Gestão de cursos
- ✅ Upload de arquivos
- ✅ Envio de emails
- ✅ Perfil de usuário
- ✅ Sistema de pagamentos
- ✅ Certificados

## 📝 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- Teodoro Pedro

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas mudanças (`git commit -m 'Adicionando uma Feature'`)
5. Faça o Push da Branch (`git push origin feature/MinhaFeature`)
6. Abra um Pull Request

## 📧 Contato

- Email: teodorop990@gmail.com
- LinkedIn: [Teodoro Pedro](https://www.linkedin.com/in/teodoro-pedro-6a075b28a/)

## 🙏 Agradecimentos

Agradecemos a todos que contribuíram para este projeto.
