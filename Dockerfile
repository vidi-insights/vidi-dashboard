# vidi-dashboard
FROM node:4


RUN mkdir /src
ADD package.json /src/

WORKDIR /src

RUN npm install

COPY . /src

RUN npm run build

EXPOSE 3000

CMD ["node", "server/start.js"]
