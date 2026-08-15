#!/bin/bash
set -e

echo "=========================================="
echo "开始通过 Git 部署 SkillOrg"
echo "仓库地址: git@github.com:netCode-x/skilorg.git"
echo "=========================================="

WORK_DIR="/app/skillOrg"
REPO_URL="git@github.com:netCode-x/skilorg.git"

if [ -d "$WORK_DIR/.git" ]; then
    cd "$WORK_DIR"
    echo "✓ 已进入现有仓库目录: $WORK_DIR"
else
    echo "→ 目录不存在，执行 git clone ..."
    sudo mkdir -p /app
    sudo chown $USER:$USER /app
    cd /app
    git clone "$REPO_URL" skillOrg
    cd skillOrg
fi

echo "→ 拉取最新代码 (git pull origin main) ..."
git pull origin main

echo "→ 构建 Docker 镜像 (tag: skillorg:latest) ..."
docker build -t skillorg:latest .

echo "→ 清理旧容器 ..."
docker stop skillorg-container 2>/dev/null && echo "  - 已停止旧容器" || echo "  - 无旧容器需要停止"
docker rm skillorg-container 2>/dev/null && echo "  - 已删除旧容器" || echo "  - 无旧容器需要删除"

echo "→ 启动新容器 (映射端口 9876:80) ..."
docker run -d --name skillorg-container -p 9876:80 skillorg:latest

if docker ps | grep -q skillorg-container; then
    echo "=========================================="
    echo "✓✓✓ 部署成功！✓✓✓"
    echo "访问地址: http://$(curl -s ifconfig.me):9876"
    echo "（若使用云服务器，请确认安全组已开放 9876 端口）"
    echo "=========================================="
else
    echo "✗ 容器启动失败，请查看日志: docker logs skillorg-container"
    exit 1
fi