ARG BASE_VERSION
FROM strapi/base:${BASE_VERSION}

ARG STRAPI_VERSION
ARG STRAPI_PACKAGE_NAME
RUN yarn global add ${STRAPI_PACKAGE_NAME}@${STRAPI_VERSION}

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /srv/app

VOLUME /srv/app

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["strapi", "develop"]
