# nodezoo-web
FROM node:4


RUN mkdir /src
ADD package.json /src/

WORKDIR /src

RUN npm install

COPY . /src

RUN npm run build

EXPOSE 8000
EXPOSE 44000
EXPOSE 43000

CMD ["node", "-r toolbag", "server/start.js", "--seneca.options.tag=vidi-dashboard", "--seneca-log=type:act"]
