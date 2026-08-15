# 阶段1：构建阶段
FROM node:18-alpine AS builder
WORKDIR /app

# 只复制依赖文件，利用 Docker 缓存
COPY package*.json ./
RUN npm install

# 复制全部源码并构建
COPY . .
RUN npm run build

# 阶段2：运行阶段（Nginx 提供静态服务）
FROM nginx:alpine
# 将构建产物复制到 Nginx 默认目录
COPY --from=builder /app/dist /usr/share/nginx/html
# 暴露 80 端口
EXPOSE 80

# 启动 Nginx（默认命令）
CMD ["nginx", "-g", "daemon off;"]