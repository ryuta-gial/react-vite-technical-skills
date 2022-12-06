# Name

- react-vite-technical-skills

# Overview

1. Staff registration function
2. Closed day registration function
3. Desired holiday registration function 
4. Spreadsheet data to show[#Spreadsheet](https://docs.google.com/spreadsheets/d/1_sXBPWjiJQNFd6EaittBKGK_PiTdbYqUXjUmdrA8JgM/edit?usp=sharing)

# Requirement

- macOS 10.15.7 or later is required.
- Docker version 20.10.17 

# Installation

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

# Usage

1. container start
```
docker-compose up --build
```

2. URL

[http://localhost:3050/addStaff](http://localhost:3050/addStaff)

# Note

## docker-compose up [Error handling](https://github.com/docker/compose/issues/3927)

```
1. export DOCKER_CLIENT_TIMEOUT=120
2. export COMPOSE_HTTP_TIMEOUT=120
3. killall Docker && open /Applications/Docker.app
```

## Memo

- local

```
yarn install
```

## build: container

### client

```
//build
$ docker build --no-cache -t client/shift:v1 -f ./client/Dockerfile.dev .

//http://localhost:8888/
$ docker run -d -p 8888:3000 -it client/shift:v1

```
### server

```
//build
$ docker build --no-cache -t server/shift:v1 -f ./server/Dockerfile.dev .

//http://localhost:8888/
$ docker run -d -p 8888:3000 -it server/shift:v1
```
