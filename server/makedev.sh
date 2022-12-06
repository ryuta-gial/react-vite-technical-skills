git init

yarn init -y

yarn add -D eslint prettier eslint-config-prettier
yarn add -D typescript ts-loader ts-node-dev nodemon concurrently @typescript-eslint/{parser,eslint-plugin}

yarn add  express @types/express
yarn add  cors @types/cors
yarn add   @types/node
yarn add -D ts-node
yarn run tsc --init

gibo dump macos linux windows node > .gitignore