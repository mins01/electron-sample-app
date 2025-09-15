#!/bin/bash

# dist.sh
# Electron Builder 배포용 빌드 실행 스크립트

echo "=============================="
echo "  Electron Builder 시작..."
echo "=============================="

# dist 폴더 삭제 (이전 빌드 정리)
# if [ -d "dist" ]; then
#     echo "이전 dist 폴더 삭제 중..."
#     rm -rf dist
# fi

# 빌드 실행
echo "배포용 빌드 실행 중..."
npm run dist

# 빌드 완료 메시지
if [ $? -eq 0 ]; then
    echo "=============================="
    echo "  빌드 완료! dist/ 폴더 확인"
    echo "=============================="
else
    echo "=============================="
    echo "  빌드 실패!"
    echo "=============================="
fi