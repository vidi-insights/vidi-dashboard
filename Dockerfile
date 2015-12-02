FROM node:4

ADD . /

CMD ["node","lib/server/index.js"]
