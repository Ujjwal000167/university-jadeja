FROM dhi.io/node:22-alpine-dev AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

COPY . .
RUN npm run build

FROM dhi.io/nginx:1.31-alpine

WORKDIR /usr/share/nginx/html

# Copy nginx config before built files (config is static, files change more often)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist .

USER 10001

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
