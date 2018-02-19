# [Strapi](https://github.com/strapi/strapi) containerized

> Strapi is an Node.js Content Management Framework (headless-CMS) to build powerful API with no effort.

[![Travis](https://img.shields.io/travis/strapi/strapi-docker.svg?style=for-the-badge)](https://github.com/strapi/strapi-docker)
[![GitHub release](https://img.shields.io/github/release/strapi/strapi-docker.svg?style=for-the-badge)](https://github.com/strapi/strapi-docker)
[![Docker Pulls](https://img.shields.io/docker/pulls/strapi/strapi.svg?style=for-the-badge)](https://hub.docker.com/r/strapi/strapi)

[Read the Medium post to have full explaination](https://medium.com/@lucaperret/strapi-quickstart-with-docker-65975dfcac09)

## Quickstart (recommended)

1. `git clone https://github.com/strapi/strapi-docker && cd strapi-docker`
2. Run using `docker-compose up`

## Pull from Docker Hub

```bash
docker pull strapi/strapi:latest
```

### Then run image

Start a database (e.g. MongoDB)

```bash
docker run -e MONGO_INITDB_DATABASE=strapi \
           -v `pwd`/db/:/data/db \
           -p 27017 \
           --name mongo \
           -d mongo
```

Start strapi

```bash
docker run -e APP_NAME=strapi-app \
           -e DATABASE_CLIENT=mongo \
           -e DATABASE_HOST=mongo \
           -e DATABASE_PORT=27017 \
           -e DATABASE_NAME=strapi \
           -v `pwd`/strapi-app:/usr/src/api/strapi-app \
           -v /usr/src/api/strapi-app/node_modules \
           --link mongo \
           -p 1337:1337 \
           --name strapi -d strapi/strapi
```

You should the be able to access your Strapi installation at [localhost](http://localhost:1337).

## Use as base image

```Dockerfile
FROM strapi/strapi:latest
```

## Environment variables

- `APP_NAME` to override the `strapi-app` generated folder name (you should also update the volumes paths).
- `DATABASE_CLIENT` a database providers supported by Strapi: MongoDB, Postgres, MySQL, Sqlite3 and Redis.
- `DATABASE_HOST` database service name.
- `DATABASE_PORT` depends on your database client.
- `DATABASE_NAME` initializes a database with specific name (default strapi). When using MongoDB, you should also update the `MONGO_INITDB_DATABASE` environment in the db service.
- `DATABASE_USERNAME` set the username of the database connection.
- `DATABASE_PASSWORD` set the password of the database connection.