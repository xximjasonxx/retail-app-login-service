FROM node:carbon
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ ./
ENTRYPOINT [ "npm", "start" ]