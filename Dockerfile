FROM node:4
ADD . /
RUN npm install
RUN npm build
CMD ["node", "server/start.js"]
