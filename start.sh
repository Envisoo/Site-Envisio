#!/bin/bash
set -euo pipefail

echo "📂 Diretório atual: $(pwd)"
echo "📂 Conteúdo disponível:"
ls -la

if [ -f "backend/package.json" ]; then
  echo "🚀 Iniciando backend..."
  cd backend
  npm install
  exec npm start
elif [ -f "frontend/package.json" ]; then
  echo "🎨 Iniciando frontend..."
  cd frontend
  npm install
  npm run build
  exec npm run start
else
  echo "❌ Nenhum projeto encontrado dentro do container!"
  exit 1
fi
