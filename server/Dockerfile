# Use Node 20 base image to match required engine versions and avoid warnings
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Copy TypeScript config and prisma directory
COPY tsconfig.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy rest of the app source code
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the app in dev mode
CMD ["npm", "run", "dev"]
