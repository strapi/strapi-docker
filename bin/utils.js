'use strict';

const execa = require('execa');
const got = require('got');

const { REPO, STRAPI_PACKAGE_NAME, STRAPI_PACKAGE_NAME_OLD } = require('./constants');

async function getLatestStrapiRelease() {
  const { body } = await got(`https://api.github.com/repos/${REPO}/releases/latest`, {
    json: true,
  });

  return body.tag_name.slice(1); // remove the v prefix
}

function execDocker(args) {
  console.log(`docker ${args.join(' ')}`);
  return execa('docker', args, {
    stdio: 'inherit',
  });
}

function isVersion4(version) {
  return version === 4;
}

function getStrapiPackageName(version) {
  return isVersion4(version) ? STRAPI_PACKAGE_NAME : STRAPI_PACKAGE_NAME_OLD;
}

module.exports = {
  execDocker,
  getLatestStrapiRelease,
  getStrapiPackageName,
};
