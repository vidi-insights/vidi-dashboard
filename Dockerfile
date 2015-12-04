FROM node:4
ADD . /
RUN npm install
CMD ["node", "lib/server/index.js"]
