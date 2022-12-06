FROM node:14.14.0-alpine
WORKDIR /app
COPY server/package.json client/yarn.lock ./
COPY server/tsconfig.json ./
RUN yarn install --production --frozen-lockfile --ignore-optional
COPY server ./

CMD ["yarn", "start"]
