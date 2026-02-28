# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package.json yarn.lock ./

# RUN yarn config set network-timeout 300000 && \
#     yarn config set network-concurrency 1 && \
#     yarn install --frozen-lockfile --network-timeout 300000

# COPY . .

# RUN rm -rf .next
# RUN yarn build

# FROM node:20-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV=production
# ENV PORT=3000

# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/.next .next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.env* ./

# EXPOSE 3000

# CMD ["yarn", "start"]



# ===============================
# STAGE 1 — BUILDER
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Dependências
COPY package.json yarn.lock ./

RUN yarn config set network-timeout 300000 && \
    yarn config set network-concurrency 1 && \
    yarn install --frozen-lockfile --network-timeout 300000

# Copia projeto
COPY . .

# Gera Prisma Client para linux-musl (Alpine)
RUN npx prisma generate

# Limpa build anterior (caso exista)
RUN rm -rf .next

# Build do Next
RUN yarn build


# ===============================
# STAGE 2 — RUNNER
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia apenas o necessário
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env* ./

EXPOSE 3000

# Aplica migrations e sobe aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && yarn start"]
