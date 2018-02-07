# [Strapi](https://github.com/strapi/strapi) containerized

> Strapi is an Node.js Content Management Framework (headless-CMS) to build powerful API with no effort.

[![Travis](https://img.shields.io/travis/strapi/strapi-docker.svg?style=for-the-badge)](https://github.com/strapi/strapi-docker)
[![GitHub release](https://img.shields.io/github/release/strapi/strapi-docker.svg?style=for-the-badge)](https://github.com/strapi/strapi-docker)
[![Docker Pulls](https://img.shields.io/docker/pulls/strapi/strapi.svg?style=for-the-badge)](https://hub.docker.com/r/strapi/strapi)

## Quickstart (recommended)

1. `git clone https://github.com/strapi/strapi-docker && cd strapi-docker`
2. Adapt `docker-compose.yml` to your needs
3. Run using `docker-compose up`

----

### Pull from Docker Hub

```bash
docker pull strapi/strapi-docker:latest
```

### Or build from GitHub

```bash
docker build -t strapi/strapi-docker github.com/strapi/strapi-docker
```

### Then run image

```bash
# Start the mongo database
docker run -e MONGO_INITDB_DATABASE=development \
           -v `pwd`/mongo/:/data/db \
           -p 27017 \
           --name mongo -d mongo

# Start strapi
docker run -e DATABASE_CLIENT=mongo \
           -e DATABASE_HOST=localhost \
           -e DATABASE_PORT=27017 \
           -e DATABASE_NAME=development \
           -e DATABASE_USERNAME= \
           -e DATABASE_PASSWORD= \
           -v `pwd`:`pwd` \
           --link mongo \
           -p 1337 \
           --name strapi -d strapi/strapi-docker
```

You should the be able to access your Strapi installation at [](http://localhost:1337).

### Use as base image

```Dockerfile
FROM strapi/strapi-docker:latest
```