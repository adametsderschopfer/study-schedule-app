FROM node:18 as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.24.0-alpine-slim
COPY --from=builder /app/build/ /app/new/
COPY default.conf /etc/nginx/conf.d/default.conf
