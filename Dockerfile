FROM node:12 as build-deps

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN node --max-old-space-size=750 npm run build

FROM nginx:latest

COPY ./docker-entrypoint.sh /
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /app

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]