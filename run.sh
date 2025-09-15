#!/bin/bash
# Electron 앱 실행 스크립트

# npm 모듈 설치 (최초 실행 시 필요)
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules 없음 → npm install 실행 중..."
  npm install
fi

# Electron 실행
echo "🚀 Electron 앱 실행..."
npm start