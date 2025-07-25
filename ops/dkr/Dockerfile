# Dockerfile for NestJS app (Alpine)
# https://dawchihliou.github.io/articles/the-last-dockerfile-you-need-for-nestjs

# ### yarn
# ## Base image
# FROM node:22.11.0-alpine AS base
# FROM base AS dev
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# ENV NODE_ENV=dev
# COPY ./src .
# RUN yarn --frozen-lockfile

# ## Builder image
# FROM base AS build
# WORKDIR /app
# RUN apk add --no-cache libc6-compat
# ENV NODE_ENV=production
# COPY --from=dev /app/node_modules ./node_modules
# COPY ./src .
# RUN yarn build
# RUN yarn --frozen-lockfile --production && yarn cache clean

# ## Production image
# FROM base AS prod
# WORKDIR /app
# RUN apk add --no-cache dumb-init tzdata curl wget
# ENV TZ=Africa/Lagos
# RUN apk add --no-cache libc6-compat
# ENV NODE_ENV=production
# RUN addgroup --system --gid 1001 nestjs
# RUN adduser --system --uid 1001 nestjs
# COPY --chown=node:node --from=build /app/dist dist
# COPY --chown=node:node --from=build /app/node_modules node_modules
# USER nestjs
# CMD ["node", "dist/main.js"]

# ### npm
## Base image
FROM node:22.11.0-alpine AS base
FROM base AS dev
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=dev
COPY ./src .
RUN npm install -g npm@latest
RUN npm install

## Builder image
FROM base AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
COPY --from=dev /app/node_modules ./node_modules
COPY ./src .
RUN npm install -g npm@latest
RUN npm run build
RUN npm install --omit=dev && npm cache clean --force

## Production image
FROM base AS prod
WORKDIR /app
RUN npm install -g npm@latest
RUN apk add --no-cache dumb-init tzdata curl wget
ENV TZ=Africa/Lagos
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
USER nestjs
CMD ["node", "dist/main.js"]



# ### pnpm
# ## Base image
# FROM node:22.11.0-alpine AS base
# FROM base AS dev
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# ENV NODE_ENV=dev
# COPY ./src/package*.json ./
# RUN npm install -g pnpm
# RUN pnpm install
# COPY ./src .
# RUN pnpm prisma generate

# ## Builder image
# FROM base AS build
# WORKDIR /app
# RUN apk add --no-cache libc6-compat
# ENV NODE_ENV=dev
# COPY --from=dev /app/node_modules ./node_modules
# COPY ./src .
# RUN npm install -g pnpm
# RUN pnpm build

# ## Production image
# FROM base AS prod
# WORKDIR /app
# RUN npm install -g pnpm
# RUN apk add --no-cache dumb-init tzdata curl wget
# ENV TZ=Africa/Lagos
# RUN apk add --no-cache libc6-compat
# ENV NODE_ENV=dev
# RUN addgroup --system --gid 1001 nestjs
# RUN adduser --system --uid 1001 nestjs
# COPY --chown=nestjs:nestjs --from=build /app/dist dist
# COPY --chown=nestjs:nestjs --from=build /app/node_modules node_modules
# COPY --chown=nestjs:nestjs --from=dev /app/prisma prisma
# COPY --chown=nestjs:nestjs --from=dev /app/package*.json ./
# # COPY --chown=nestjs:nestjs ./ops/sh/start.sh /app/start.sh
# # RUN chmod +x /app/start.sh
# USER nestjs
# # CMD ["/app/start.sh"]
# CMD ["node", "dist/main.js"]
