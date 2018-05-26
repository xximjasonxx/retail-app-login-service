FROM node:carbon
WORKDIR /app

COPY package*.json ./
RUN npm install
ENV PORT 80
EXPOSE 80

COPY ./ ./
ENTRYPOINT [ "npm", "start" ]