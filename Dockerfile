FROM node:lts

WORKDIR /usr/src/app

COPY src src/

COPY package*.json ./

RUN npm install --production && npm audit fix --only=prod

CMD ["node", "src/index.js"]
