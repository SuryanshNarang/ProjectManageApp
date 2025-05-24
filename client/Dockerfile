# client/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY client .

# Build Next.js app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
