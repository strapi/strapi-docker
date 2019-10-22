'use strict';

const execa = require('execa');
const got = require('got');

const { REPO } = require('./contstants');

async function getLatestStrapiRelease() {
  const { body } = await got(
    `https://api.github.com/repos/${REPO}/releases/latest`,
    { json: true }
  );

  return body.tag_name.slice(1); // remove the v prefix
}

function execDocker(args) {
  console.log(`docker ${args.join(' ')}`);
  return execa('docker', args, {
    stdio: 'inherit',
  });
}

module.exports = {
  execDocker,
  getLatestStrapiRelease,
};
