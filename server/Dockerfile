FROM node:18-alpine

WORKDIR /app

# Copy package and Prisma schema early for better caching
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

RUN npm install

# Copy all source files
COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "start"]
