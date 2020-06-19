FROM strapi/base

WORKDIR /srv/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production


EXPOSE 1337

RUN chmod a+x /srv/app/run.sh

CMD ["/srv/app/run.sh"]
