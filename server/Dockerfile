# server/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY server/package*.json ./
COPY server/tsconfig.json ./
COPY server/prisma ./prisma

# Install deps
RUN npm install

# Copy source
COPY server .

# Build TypeScript
RUN npm run build

# Prisma generate
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "start"]
