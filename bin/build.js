#!/usr/bin/env node
'use strict';

const yargs = require('yargs');

const { buildBaseImages } = require('./base');
const { buildStrapiImages } = require('./strapi');

async function run() {
  const shouldPush = argv.push;
  const version = argv.strapiVersion;

  switch (argv.type) {
    case 'base': {
      const images = await buildBaseImages({ shouldPush });
      logImages(images);

      break;
    }
    case 'strapi': {
      const images = await buildStrapiImages({ version, shouldPush });
      logImages(images);

      break;
    }
    case 'all':
    default: {
      const baseImages = await buildBaseImages({ shouldPush });
      const strapiImages = await buildStrapiImages({ version, shouldPush });
      logImages([...baseImages, ...strapiImages]);

      break;
    }
  }
}

const argv = yargs
  .option('type', {
    alias: 't',
    describe: 'Which images to build (all,strapi,base)',
    default: 'all',
    type: 'string',
  })
  .option('push', {
    alias: 'p',
    describe: 'Should push the image after creating it',
    default: process.env.PUSH || false,
    type: 'boolean',
  })
  .option('strapiVersion', {
    describe: 'strapi version to build',
    default: process.env.STRAPI_VERSION || 'latest',
    type: 'string',
  })
  .version(false)
  .help('h')
  .alias('h', 'help').argv;

if (argv.help) {
  yargs.showHelp();
  return;
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});

function logImages(imgs) {
  console.log('---------------------------------------');
  console.log('Images created:');
  console.log(imgs.map(img => `- ${img}`).join('\n'));
  console.log('---------------------------------------');
}
