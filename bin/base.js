'use strict';

const { execDocker } = require('./utils');
const {
  NODE_VERSIONS,
  BASE_IMAGE_NAME,
  LATEST_NODE_VERSION,
} = require('./contstants');

module.exports = {
  buildBaseImages,
};

async function buildBaseImages({ shouldPush = false } = {}) {
  const createdTags = [];
  for (const nodeVersion of NODE_VERSIONS) {
    const tags = await buildBaseImage({ nodeVersion, shouldPush });
    const alpineTags = await buildBaseImage({
      nodeVersion,
      alpine: true,
      shouldPush,
    });

    createdTags.push(...tags, ...alpineTags);
  }

  return createdTags.map(tag => `${BASE_IMAGE_NAME}:${tag}`);
}

async function buildBaseImage({ nodeVersion, alpine, shouldPush = false }) {
  let tmpImg = `${BASE_IMAGE_NAME}:tmp`;

  await execDocker([
    'build',
    '--build-arg',
    `NODE_VERSION=${nodeVersion}${alpine ? '-alpine' : ''}`,
    '-t',
    tmpImg,
    `./base${alpine ? '/alpine' : ''}`,
  ]);

  const tags = buildBaseTags({ nodeVersion, alpine });

  for (const tag of tags) {
    await execDocker(['tag', tmpImg, `${BASE_IMAGE_NAME}:${tag}`]);

    if (shouldPush) {
      await execDocker(['push', `${BASE_IMAGE_NAME}:${tag}`]);
    }
  }

  await execDocker(['image', 'rm', tmpImg]);
  return tags;
}

function buildBaseTags({ nodeVersion, alpine = false }) {
  let tags = [];

  tags.push(`${nodeVersion}${alpine ? '-alpine' : ''}`);

  if (nodeVersion === LATEST_NODE_VERSION && !alpine) {
    tags.push('latest');
  }

  return tags;
}
