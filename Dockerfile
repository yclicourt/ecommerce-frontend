
# ---------- Stage1: Build -------------
FROM registry.local:5443/oficial-images/node:20-alpine AS build 

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./


RUN npm install -g pnpm@10.33.0 && \
pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:prod

# ---------- Stage1: Servir con nginx -------------
FROM registry.local:5443/oficial-images/nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN touch  /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

COPY --from=build --chown=nginx:nginx /app/dist/ecommerce-frontend/browser /usr/share/nginx/html

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]