FROM docker.io/node:lts-alpine3.18 as build

RUN mkdir /workdir
WORKDIR /workdir

COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn

COPY . .
RUN yarn build


FROM docker.io/httpd:alpine

COPY --from=build /workdir/dist/ /usr/local/apache2/htdocs/

