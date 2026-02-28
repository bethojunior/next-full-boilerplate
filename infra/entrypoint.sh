#!/bin/sh


echo "➡️ Executando Prisma Generate"
npx prisma generate

echo "➡️ Executando Prisma Migrate Deploy"
npx prisma migrate deploy

echo "➡️ Build da aplicação"
yarn build
