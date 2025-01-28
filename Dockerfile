# Use the official Node.js LTS image as the base image for building
FROM node:${NODE_VERSION}-alpine AS builder

# Create and set the working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Use a smaller base image for production
FROM node:${NODE_VERSION}-alpine AS production

# Create app directory
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set NODE_ENV
ENV NODE_ENV production

# Use non-root user for better security
USER node

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main"]
