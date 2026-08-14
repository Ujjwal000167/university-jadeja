FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npx prisma generate

FROM node:24-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/src ./src
COPY --from=build --chown=node:node /app/package*.json ./

USER node

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/api/v1/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node src/index.js"]

