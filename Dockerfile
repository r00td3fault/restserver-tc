FROM node:14.18-alpine
COPY package.json .
RUN npm install --quiet
COPY . .