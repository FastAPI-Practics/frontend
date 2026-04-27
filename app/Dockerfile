FROM node:25-bookworm-slim AS node-base
FROM node-base AS installer

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

FROM node-base AS builder

WORKDIR /app

COPY --from=installer /app/node_modules /app/node_modules

COPY *.json vite.config.ts index.html /app/

COPY src /app/src
COPY public /app/public

RUN npm run build

FROM nginx:stable-alpine-slim

RUN apk update && apk upgrade --no-cache

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/www/html && \
    chown -R nginx:nginx /etc/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 80

USER nginx

CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]