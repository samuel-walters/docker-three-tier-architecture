FROM node:alpine
WORKDIR /usr/src/server

COPY package.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]