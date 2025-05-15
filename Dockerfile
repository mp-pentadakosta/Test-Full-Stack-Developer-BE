# =====================
# Stage 1: Build
# =====================
FROM node:18.18.0 AS builder
ENV NODE_ENV=development

WORKDIR /home/node/app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Ensure the prisma folder is copied so Prisma can generate the client
COPY prisma ./prisma

# Generate Prisma client after installing dependencies
RUN npx prisma generate

# Copy seluruh kode proyek
COPY . .

# Build aplikasi
RUN npm run build


# =====================
# Stage 2: Production
# =====================
FROM node:18.18.0

ENV NODE_ENV=production
WORKDIR /home/node/app

# Copy package.json dan install dependencies
COPY --from=builder /home/node/app/package*.json ./
RUN npm install --omit=dev

# Copy Prisma client dan schema
COPY --from=builder /home/node/app/node_modules/.prisma /home/node/app/node_modules/.prisma
COPY --from=builder /home/node/app/prisma /home/node/app/prisma

# Copy hasil build aplikasi
COPY --from=builder /home/node/app/dist ./dist

# Expose port aplikasi
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "dist/main"]
