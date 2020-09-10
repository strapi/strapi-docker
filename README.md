# [Strapi](https://github.com/strapi/strapi) containerized

![Strapi](https://cldup.com/7umchwdUBh.png)

API creation made simple, secure and fast.
The most advanced open-source Content Management Framework to build powerful API with no effort.

---

[![Travis](https://img.shields.io/travis/strapi/strapi-docker.svg?style=for-the-badge)](https://travis-ci.org/strapi/strapi-docker)
[![Docker Pulls](https://img.shields.io/docker/pulls/strapi/strapi.svg?style=for-the-badge)](https://hub.docker.com/r/strapi/strapi)

## Images

Strapi comes with two images: `strapi/strapi` and `strapi/base`.

Use [`strapi/strapi`](#how-to-use-strapistrapi) to create a new project or run a project on your host machine.

Use [`strapi/base`](#how-to-use-strapibase) to build a Dockerfile and create an image for your app.

## How to use `strapi/strapi`

This image allows you to create a new strapi project or run a project from your host machine. The default command that will run in your project is [`strapi develop`](https://strapi.io/documentation/v3.x/cli/CLI.html#strapi-develop-dev).

### Creating a new project

When running this image, strapi will check if there is a project in the `/srv/app` folder of the container. If there is nothing then it will run the [`strapi new`](https://strapi.io/documentation/v3.x/cli/CLI.html#strapi-new) command in the container /srv/app folder. You can create a new project by running this command.

```bash
docker run -it -p 1337:1337 -v `pwd`/project-name:/srv/app strapi/strapi
```

This command creates a project with an SQLite database. Then starts it on port `1337`.

The `-v` option creates a `project-name` folder on your computer that will be shared with the docker container.
Once the project is created it will be available in this folder on your computer.

**Environment variables**

When creating a new project with this image you can pass database configurations to the [`strapi new`](https://strapi.io/documentation/v3.x/cli/CLI.html#strapi-new) command.

- `DATABASE_CLIENT` a database provider supported by Strapi: (sqlite, postgres, mysql ,mongo).
- `DATABASE_HOST` database host.
- `DATABASE_PORT` database port.
- `DATABASE_NAME` database name.
- `DATABASE_USERNAME` database username.
- `DATABASE_PASSWORD` database password.
- `DATABASE_SSL` boolean for SSL.
- `EXTRA_ARGS` pass extra args to the [`strapi new`](https://strapi.io/documentation/v3.x/cli/CLI.html#strapi-new).

**Example**

You can create a strapi project that will connect to a remote postgres database like so:

```bash
docker run -it \
  -e DATABASE_CLIENT=postgres \
  -e DATABASE_NAME=strapi \
  -e DATABASE_HOST=0.0.0.0 \
  -e DATABASE_PORT=5432 \
  -e DATABASE_USERNAME=strapi \
  -e DATABASE_PASSWORD=strapi \
  -p 1337:1337 \
  -v `pwd`/project-name:/srv/app \
  strapi/strapi
```

You can also create projects using docker-compose. See examples of using these variables with docker-compose in the [examples folder](./examples).

### Running a project from your host machine

You can also use `strapi/strapi` to run a project you already have created (or cloned for a repo) on your computer.

First make sure to delete the `node_modules` folder if you have already installed your dependencies on your host machine. Then run:

```bash
cd my-project
docker run -it -p 1337:1337 -v `pwd`:/srv/app strapi/strapi
```

This will start by installing the dependencies and then run `strapi develop` in the project.

**Environment variables**

If you are using environment variables in your code you can pass them with the -e option (e.g `docker run -e ENV_VAR=sth ...`).

You can for example set your database configuration with environment variables.
Because the default container command is [`strapi develop`](https://strapi.io/documentation/v3.x/cli/CLI.html#strapi-develop-dev) you will need to update your `development` database configuration following the `production` example in the [documentation](https://strapi.io/documentation/v3.x/concepts/configurations.html#dynamic-configurations). Then you can run:

```bash
docker run -it \
  -e DATABASE_NAME=strapi \
  -e DATABASE_HOST=0.0.0.0 \
  -e DATABASE_PORT=1234 \
  -e DATABASE_USERNAME=strapi \
  -e DATABASE_PASSWORD=strapi \
  -p 1337:1337 \
  -v `pwd`/project-name:/srv/app \
  strapi/strapi
```

## How to use `strapi/base`

When deploying a strapi application to production you can use docker to package your whole app in an image. You can create a Dockerfile in your strapi project like the one in [`./examples/custom`](./examples/custom)

## Building the images in this repository

You can build the images with the build command. To see the options run:

```
./bin/build.js --help
```
