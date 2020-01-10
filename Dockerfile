FROM node:9-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY index.js .
COPY server.js .
COPY db.js .
COPY carnets.js .
COPY jest.config.js .
#COPY test/server.test.js .

EXPOSE 3001

CMD npm start