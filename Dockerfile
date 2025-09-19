# ===========================
# Estágio 1: Build do Frontend
# ===========================
FROM node:18 AS build-frontend

WORKDIR /app/frontend

# Copiar apenas package.json e package-lock.json primeiro (cache)
COPY frontend/package*.json ./

# Instalar dependências do frontend
RUN npm install --legacy-peer-deps

# Copiar código do frontend
COPY frontend/ ./

# Build do frontend
RUN npm run build

# ===========================
# Estágio 2: Backend + Build do Frontend
# ===========================
FROM node:18

WORKDIR /app/backend

# Copiar apenas package.json e package-lock.json do backend
COPY backend/package*.json ./

# Instalar dependências do backend
RUN npm install --legacy-peer-deps

# Copiar o código backend
COPY backend/ ./

# Copiar o build do frontend para a pasta pública do backend
COPY --from=build-frontend /app/frontend/build ./public

# Expõe a porta
EXPOSE 8080

# Inicia o servidor backend
CMD ["npm", "start"]
