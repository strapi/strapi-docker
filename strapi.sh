#!/bin/sh
set -ea

_stopStrapi() {
  echo "Stopping strapi"
  kill -SIGINT "$strapiPID"
  wait "$strapiPID"
}

trap _stopStrapi TERM INT

cd /usr/src/api

APP_NAME=${APP_NAME:-strapi-app}
DATABASE_CLIENT=${DATABASE_CLIENT:-mongo}
DATABASE_HOST=${DATABASE_HOST:-localhost}
DATABASE_PORT=${DATABASE_PORT:-27017}
DATABASE_NAME=${DATABASE_NAME:-strapi}
DATABASE_SRV=${DATABASE_SRV:-false}
EXTRA_ARGS=${EXTRA_ARGS:-}

FRESH_BOOTSTRAP=false

if [ ! -f "$APP_NAME/package.json" ]
then
    strapi new "${APP_NAME}" \
    "--dbclient=$DATABASE_CLIENT" \
    "--dbhost=$DATABASE_HOST" \
    "--dbport=$DATABASE_PORT" \
    "--dbsrv=$DATABASE_SRV" \
    "--dbname=$DATABASE_NAME" \
    "--dbusername=$DATABASE_USERNAME" \
    "--dbpassword=$DATABASE_PASSWORD" \
    "--dbssl=$DATABASE_SSL" \
    "--dbauth=$DATABASE_AUTHENTICATION_DATABASE" \
    $EXTRA_ARGS

    FRESH_BOOTSTRAP=true
elif [ ! -d "$APP_NAME/node_modules" ]
then
    npm install --prefix "./$APP_NAME"
fi

cd "$APP_NAME"

# (re)build admin panel
# you may want to do this in an initContainer if you deploy Strapi on kubernetes
# https://strapi.io/documentation/3.0.0-beta.x/guides/deployment.html#_3-launch-the-server
if [ ! "$FRESH_BOOTSTRAP" = true ]
then
  echo "(re)building the admin panel"
  npm run build
fi

if [ "$NODE_ENV" = "development" ]
then
  npm run develop &
else
  npm run start &
fi

strapiPID=$!
wait "$strapiPID"
