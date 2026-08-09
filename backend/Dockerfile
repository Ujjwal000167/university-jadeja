FROM dhi.io/node:22-alpine-dev AS build

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY src ./src

FROM dhi.io/node:22-alpine-dev

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=build /app /app

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]

