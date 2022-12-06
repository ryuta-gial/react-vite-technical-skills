FROM node:14.14.0-alpine as builder
WORKDIR /app

COPY client/package.json client/yarn.lock ./
COPY client/tsconfig.json ./

RUN yarn install --production --frozen-lockfile --ignore-optional
COPY client ./
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html