#!/bin/sh
set -ea

if [ "$1" = "strapi" ]; then

  if [ ! -f "package.json" ]; then

    DATABASE_CLIENT=${DATABASE_CLIENT:-sqlite}

    EXTRA_ARGS=${EXTRA_ARGS}

    echo "Using strapi $(strapi -v)"
    echo "No project found at /srv/app. Creating a new strapi project"

    strapi new . \
      --dbclient=$DATABASE_CLIENT \
      --dbhost=$DATABASE_HOST \
      --dbport=$DATABASE_PORT \
      --dbname=$DATABASE_NAME \
      --dbusername=$DATABASE_USERNAME \
      --dbpassword=$DATABASE_PASSWORD \
      --dbssl=$DATABASE_SSL \
      --docker
      $EXTRA_ARGS

  elif [ ! -d "node_modules" ]; then

    echo "Node modules not installed. Installing..."

    if [ -f "yarn.lock" ]; then

      yarn install

    elif [ -f "package-json.lock" ]; then

      npm install

    fi

  fi

fi

echo "Starting your app..."

exec "$@"
