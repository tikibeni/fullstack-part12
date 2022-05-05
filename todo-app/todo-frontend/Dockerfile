FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CI=true

RUN npm run test

FROM build-stage as build

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

#  Needs to be run with `$ docker run -p 8000:80 todo-frontend`
FROM nginx:1.20-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

