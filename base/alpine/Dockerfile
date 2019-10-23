ARG NODE_VERSION
FROM node:${NODE_VERSION}

RUN apk update && apk upgrade && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm

EXPOSE 1337