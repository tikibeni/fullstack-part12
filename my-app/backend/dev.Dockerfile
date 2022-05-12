FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=phonebook-backend-dev:*

USER node

CMD npm run dev
