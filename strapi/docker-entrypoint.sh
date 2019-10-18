#!/bin/sh
set -ea

if [ "$1" = "strapi" ]; then

  if [ ! -f "package.json" ]; then

    DATABASE_CLIENT=${DATABASE_CLIENT:-sqlite}

    EXTRA_ARGS=${EXTRA_ARGS}

    echo "$ARGS"

    strapi new . \
      --dbclient=$DATABASE_CLIENT \
      --dbhost=$DATABASE_HOST \
      --dbport=$DATABASE_PORT \
      --dbname=$DATABASE_NAME \
      --dbusername=$DATABASE_USERNAME \
      --dbpassword=$DATABASE_PASSWORD \
      --dbssl=$DATABASE_SSL \
      --dbsrv=$DATABASE_SRV \
      --dbauth=$DATABASE_AUTH \
      $EXTRA_ARGS

  elif [ ! -d "node_modules" ]; then

    if [ -f "yarn.lock" ]; then

      yarn install

    elif [ -f "package-json.lock" ]; then

      npm install

    fi

  fi

fi

exec "$@"
