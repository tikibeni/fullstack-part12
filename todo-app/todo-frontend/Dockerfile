FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm run test

FROM test-stage as app-frontend

COPY . .

RUN npm ci

# ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

#  Needs to be run with `$ docker run -p 8000:80 app-frontend`
FROM nginx:1.20-alpine

COPY --from=app-frontend /usr/src/app/build /usr/share/nginx/html

