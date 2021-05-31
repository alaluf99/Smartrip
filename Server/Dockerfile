FROM node:12.19.0-alpine3.9

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/app.js"]
