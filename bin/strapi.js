'use strict';

const semver = require('semver');

const { execDocker, getLatestStrapiRelease } = require('./utils');
const {
  STRAPI_IMAGE_NAME,
  NODE_VERSIONS,
  LATEST_NODE_VERSION,
} = require('./contstants');

module.exports = {
  buildStrapiImages,
};

async function buildStrapiImages({ version, shouldPush = false } = {}) {
  if (version === 'latest' || !version) {
    version = await getLatestStrapiRelease();
  }

  if (semver.valid(version) === null) {
    throw new Error('Invalid strapi version provided: ' + version);
  }

  const createdTags = [];

  for (const nodeVersion of NODE_VERSIONS) {
    const tags = await buildStrapiImage({ nodeVersion, version, shouldPush });
    const alpineTags = await buildStrapiImage({
      nodeVersion,
      version,
      alpine: true,
      shouldPush,
    });

    createdTags.push(...tags, ...alpineTags);
  }

  return createdTags.map(tag => `${STRAPI_IMAGE_NAME}:${tag}`);
}

async function buildStrapiImage({
  nodeVersion,
  version,
  alpine = false,
  shouldPush = false,
}) {
  let tmpImg = `${STRAPI_IMAGE_NAME}:tmp`;

  await execDocker([
    'build',
    '--build-arg',
    `BASE_VERSION=${nodeVersion}${alpine ? '-alpine' : ''}`,
    '--build-arg',
    `STRAPI_VERSION=${version}`,
    '-t',
    tmpImg,
    './strapi',
  ]);

  const tags = buildStrapiTags({ version, nodeVersion, alpine });

  for (let tag of tags) {
    await execDocker(['tag', tmpImg, `${STRAPI_IMAGE_NAME}:${tag}`]);

    if (shouldPush) {
      await execDocker(['push', `${STRAPI_IMAGE_NAME}:${tag}`]);
    }
  }

  await execDocker(['image', 'rm', tmpImg]);

  return tags;
}

function buildStrapiTags({
  version: strapiVersion,
  nodeVersion,
  alpine = false,
}) {
  let tags = [];
  let versions = [strapiVersion];

  const major = semver.major(strapiVersion);
  const minor = semver.minor(strapiVersion);
  const patch = semver.patch(strapiVersion);
  const pre = semver.prerelease(strapiVersion);

  if (!pre) {
    versions = [major, `${major}.${minor}`, `${major}.${minor}.${patch}`];
  }

  for (const version of versions) {
    tags.push(`${version}-node${nodeVersion}${alpine ? '-alpine' : ''}`);

    if (nodeVersion === LATEST_NODE_VERSION) {
      tags.push(`${version}${alpine ? '-alpine' : ''}`);
    }
  }

  if (nodeVersion === LATEST_NODE_VERSION && !alpine) {
    tags.push('latest');
  }

  if (nodeVersion === LATEST_NODE_VERSION && alpine) {
    tags.push('alpine');
  }

  return tags;
}
