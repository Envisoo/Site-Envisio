#!/bin/bash
# Script de inicialização para o Railway
# Define qual app rodar: backend ou frontend

set -e

if [ APP = "backend" ]; then
  echo "🚀 Iniciando o backend..."
  cd back-end
  npm install
  npm start
elif [ APP = "frontend" ]; then
  echo "🎨 Iniciando o frontend..."
  cd front-end
  npm install
  npm run build
  npm run start
else
  echo "❌ Variável APP não definida. Use APP=backend ou APP=frontend."
  exit 1
fi
