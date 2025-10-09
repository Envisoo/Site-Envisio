# ============================
# Etapa 1 – Build do Frontend
# ============================
FROM node:18 AS build-frontend

WORKDIR /app/frontend

# Copiar arquivos de dependência primeiro (cache eficiente)
COPY frontend/package*.json ./

# Instalar dependências do frontend
RUN npm install --legacy-peer-deps

# Copiar código do frontend
COPY frontend/ ./

# Gerar build de produção
RUN npm run build

# ============================
# Etapa 2 – Backend + Servindo Frontend
# ============================
FROM node:18

WORKDIR /app/backend

# Copiar arquivos de dependência do backend
COPY backend/package*.json ./

# Instalar dependências do backend
RUN npm install --legacy-peer-deps

# Copiar código backend
COPY backend/ ./

# Copiar build do frontend para a pasta pública do backend
COPY --from=build-frontend /app/frontend/build ./public

# Expor a porta
EXPOSE 8080

# Iniciar servidor
CMD ["npm", "start"]
