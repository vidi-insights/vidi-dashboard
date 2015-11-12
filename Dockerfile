FROM node:4

ADD . /

RUN npm install

RUN npm run build
RUN npm run serve
