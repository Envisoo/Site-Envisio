# Usa Node LTS
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install --legacy-peer-deps

# Copia o resto do código
COPY . .

# Expõe a porta que o Railway define
EXPOSE 3000

# Starta o servidor (Express, NestJS, etc.)
CMD ["npm", "start"]
