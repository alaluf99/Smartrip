FROM node:12.19.0-alpine3.9

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/app.js"]
