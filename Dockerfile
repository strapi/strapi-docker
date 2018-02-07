FROM node:alpine

LABEL maintainer="Luca Perret <perret.luca@gmail.com>" \
      org.label-schema.version=latest \
      org.label-schema.vcs-url="https://github.com/strapi/strapi-docker" \
      org.label-schema.name="strapi-docker" \
      org.label-schema.description="Strapi containerized" \
      org.label-schema.vendor="Strapi" \
      org.label-schema.schema-version="1.0"

WORKDIR /usr/src/api

RUN npm install -g strapi@3.0.0-alpha.9.2

COPY strapi.sh ./
RUN chmod +x ./strapi.sh

EXPOSE 1337

CMD ./strapi.sh
