#!/bin/bash
SERVER="root@47.251.25.149"
REMOTE_DIR="/var/www/beyondesoft-ai-hub"
PROJECT_NAME="AI Capability Hub"

echo "🔨 [$PROJECT_NAME] 正在打包..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 打包失败，终止部署"
  exit 1
fi

echo "🚀 正在上传到服务器..."
rsync -avz --delete dist/ $SERVER:$REMOTE_DIR/

if [ $? -ne 0 ]; then
  echo "❌ 上传失败，请检查网络或服务器状态"
  exit 1
fi

echo "✅ 部署完成！访问 http://47.251.25.149:8081"
