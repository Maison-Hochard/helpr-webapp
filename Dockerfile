FROM node:18-alpine as builder

ARG STRIPE_SECRET_KEY
ARG DATABASE_URL
ARG APP_DOMAIN
ARG API_URL

WORKDIR /app

RUN npm install -g pnpm

RUN apk add --update --no-cache openssl1.1-compat python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

COPY . .

RUN pnpm install
RUN pnpm build

RUN npx prisma generate

CMD ["pnpm", "start"]

EXPOSE 8080