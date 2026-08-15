# ==================== 构建阶段 ====================
FROM node:20-alpine AS builder
WORKDIR /app/web

# 设置 npm 镜像源（国内加速，避免网络超时）
RUN npm config set registry https://registry.npmmirror.com

# 只复制依赖文件，利用 Docker 缓存
COPY package*.json ./
RUN npm install

# 复制全部源码并构建
COPY . .
RUN npm run build

# ==================== 运行阶段（Nginx） ====================
FROM nginx:alpine
# 将构建产物复制到 Nginx 默认目录
COPY --from=builder /app/web/dist /usr/share/nginx/html
# 暴露 80 端口
EXPOSE 80

# 启动 Nginx（默认命令）
CMD ["nginx", "-g", "daemon off;"]