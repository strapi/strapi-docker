# [Strapi](https://github.com/strapi/strapi) containerized

![Strapi](https://cldup.com/7umchwdUBh.png)

API creation made simple, secure and fast.
The most advanced open-source Content Management Framework to build powerful API with no effort.

---

[![Travis](https://img.shields.io/travis/strapi/strapi-docker.svg?style=for-the-badge)](https://travis-ci.org/strapi/strapi-docker)
[![Docker Pulls](https://img.shields.io/docker/pulls/strapi/strapi.svg?style=for-the-badge)](https://hub.docker.com/r/strapi/strapi)

## Images

Strapi comes with two images: `strapi/strapi` and `strapi/base`.

Use [`strapi/strapi`](#strapi-strapi) to create a new project or run a project on your host machine.

Use [`strapi/base`](#strapi-base) to build a Dockerfile and create an image for your app.

## How to use `strapi/strapi`

This image allows you to create a new strapi project or run a project form your host machine. The default command that will run in your project is `strapi develop`.

### Creating a new project

When running this image strapi will check if there is a project in the `/src/app` folder of the container. If there is nothing then it will run the `strapi new` command in this folder. You can create a new project by running this command.

```
docker run -it -p 1337:1337 -v `pwd`/project-name:/srv/app strapi/strapi
```

This command creates a project with an sqlite database. Then starts it on port 1337.

When creating a new project with this image you can give pass a database config to the `strapi new` command.

**Environment variables**

- `DATABASE_CLIENT` a database provider supported by Strapi: (sqlite, postgres, mysql ,mongo).
- `DATABASE_HOST` database host.
- `DATABASE_PORT` database port.
- `DATABASE_NAME` database name.
- `DATABASE_USERNAME` database username.
- `DATABASE_PASSWORD` database password.
- `DATABASE_SSL` boolean for SSL.
- `EXTRA_ARGS` pass extra args to the `strapi new`.

You can see examples of using these variables with docker-compose in the [examples folder](./examples).

### Running a project from your host machine

You can also use `strapi/strapi` to run a project you already have created (or cloned for a repo) on your computer.

First make sure to delete the node_modules folder if you have already installed your dependencies on your host machine. Then run:

```
cd my-project
docker run -it -p 1337:1337 -v `pwd`:/srv/app strapi/strapi
```

This will start by installing the dependencies and then run `strapi develop` in the project. If you are using environment variables in your code make sure to pass them with the -e option (e.g `docker run -e ENV_VAR=sth ...`)

## How to use `strapi/base`

When deploying a strapi application to production you can use docker to package your whole app in an image. You can create a Dockerfile in your strapi project like the one in [`./examples/custom`](./examples/custom)

## Building the images in this repository

You can build the images with the build command. To see the options run:

```
./bin/build.js --help
```
