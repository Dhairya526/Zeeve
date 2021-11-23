FROM node:14

WORKDIR /usr/src/calculator/frontend

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run" , "start"]