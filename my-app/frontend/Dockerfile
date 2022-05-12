FROM node:16 AS my-app-frontend

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

#  Needs to be run with `$ docker run -p 8000:80 my-app-frontend`
FROM nginx:1.20-alpine

COPY --from=my-app-frontend /usr/src/app/build /usr/share/nginx/html

