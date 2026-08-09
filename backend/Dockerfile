FROM dhi.io/node:24-alpine-dev AS deps

RUN apk add --no-cache openssl=3.0.14-r0

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npx prisma generate && npm run build

FROM dhi.io/node:24-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Prisma query engine dynamically links against OpenSSL.
COPY --from=build /usr/lib/libssl.so* /usr/lib/libcrypto.so* /usr/lib/
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --chown=node:node docker-entrypoint.js ./

USER node

EXPOSE 4000

ENTRYPOINT ["node", "docker-entrypoint.js"]

