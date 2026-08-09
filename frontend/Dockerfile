FROM dhi.io/node:22-alpine-dev AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts \
  && npm cache clean --force

COPY . .
RUN npm run build

FROM dhi.io/nginx:1.31-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER 10001

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
