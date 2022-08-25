FROM node:16.14-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]