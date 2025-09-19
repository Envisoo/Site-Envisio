# Etapa de build
FROM node:18 as build

WORKDIR /app

# Copia package.json e lock
COPY package*.json ./

# Instala dependências
RUN npm install --legacy-peer-deps

# Copia código do frontend
COPY . .

# Faz o build de produção
RUN npm run build

# Etapa de produção
FROM node:18

WORKDIR /app

# Instala "serve" para servir arquivos estáticos
RUN npm install -g serve

# Copia build da etapa anterior
COPY --from=build /app/build ./build

# Expõe porta do Railway
EXPOSE 3000

# Roda servidor estático
CMD ["serve", "-s", "build", "-l", "3000"]
