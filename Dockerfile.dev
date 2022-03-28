FROM node:16.14-alpine

WORKDIR /app
COPY package*.json tsconfig*.json ./
RUN npm ci
