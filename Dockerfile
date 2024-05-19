FROM node:20-alpine

# Set timezone as early as possible
ENV TZ='Asia/Kolkata'

# Install necessary system dependencies
RUN apk add --no-cache --virtual .build-deps alpine-sdk \
    && apk add --no-cache tzdata

RUN apk add python3

# Install npm globally (outside container npm)
RUN npm install -g npm

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Create app directory and set as working directory
RUN mkdir -p /backend-app
WORKDIR /backend-app

# Copy package files first for efficient caching
COPY package.json /backend-app
COPY package-lock.json /backend-app

# Install production dependencies for optimized image size
RUN npm install --production --legacy-peer-deps

# ARG STAGE=prod
ENV STAGE=dev

# Expose the application port (assuming it listens on port 3500)
EXPOSE 3005

# Copy application code
COPY . /backend-app

# Build the application
RUN nest build app

# Start the application
CMD ["node", "dist/main.js"]
