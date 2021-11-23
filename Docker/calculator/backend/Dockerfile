FROM node:14

WORKDIR /usr/src/calculator/backend

COPY package.json .

RUN npm install

COPY . .

CMD [ "node", "index.js" ]