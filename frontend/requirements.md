<!-- @format -->

# Requisitos para rodar o projeto

## 1. Node.js e npm

- Instale o [Node.js LTS](https://nodejs.org/) (inclui o npm).

## 2. Instalar dependências do projeto

No terminal, dentro da pasta `frontend`, execute:

```sh
npm install
```

## 3. Dependências principais

O projeto utiliza:

- React
- Tailwind CSS
- Framer Motion
- Lucide React (ícones)

Se precisar instalar manualmente:

```sh
npm install react react-dom
npm install tailwindcss postcss autoprefixer
npm install framer-motion
npm install lucide-react
```

## 4. Configurar o Tailwind CSS

Se ainda não estiver configurado, rode:

```sh
npx tailwindcss init -p
```

E ajuste o arquivo `tailwind.config.js` conforme a documentação do Tailwind.

## 5. Rodar o projeto

No terminal, execute:

```sh
npm run dev
```

ou

```sh
npm start
```

## 6. Outras recomendações

- Use o VS Code para melhor experiência.
- Certifique-se de que a imagem `/banner-servicos.jpg` está na pasta `public` do projeto.

---

Pronto! O projeto estará rodando em http://localhost:3000 ou http://localhost:5173
