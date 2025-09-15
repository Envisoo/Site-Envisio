#!/bin/bash
set -e

if [ -f "back-end/package.json" ]; then
  echo "🚀 Iniciando backend..."
  cd back-end
  npm install
  npm start
elif [ -f "front-end/package.json" ]; then
  echo "🚀 Iniciando frontend..."
  cd front-end
  npm install
  npm run build
  npm run start
else
  echo "❌ Nenhum projeto encontrado (backend ou frontend)."
  exit 1
fi
