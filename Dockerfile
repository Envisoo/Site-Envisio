# Etapa 1: build do frontend
FROM node:18 AS build-frontend

WORKDIR /app/frontend

# Copia apenas dependências primeiro (cache otimizado)
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copia código do frontend
COPY frontend/ ./

# Build de produção do frontend
RUN npm run build

# Etapa 2: backend
FROM node:18

WORKDIR /app/backend

# Copia dependências do backend
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps

# Copia código do backend
COPY backend/ ./

# Copia o build do frontend para dentro do backend (servido como estático)
COPY --from=build-frontend /app/frontend/build ./public

# Expõe porta Railway
EXPOSE 3000

# Comando de start do backend
CMD ["npm", "start"]
