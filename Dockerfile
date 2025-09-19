# Usa a imagem oficial do Node.js LTS
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia todos os arquivos do projeto
COPY . .

# Torna o start.sh executável
RUN chmod +x start.sh

# Instala dependências do backend
WORKDIR /app/backend
RUN npm install

# Instala dependências do frontend
WORKDIR /app/frontend
RUN npm install

# Volta para a raiz
WORKDIR /app

# Expõe a porta (Railway usa automaticamente)
EXPOSE 3000

# Comando inicial
CMD ["sh", "./start.sh"]
