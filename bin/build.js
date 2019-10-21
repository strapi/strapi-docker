#!/usr/bin/env node
const got = require('got');

const yargs = require('yargs');
const execa = require('execa');
const semver = require('semver');

const REPO = 'strapi/strapi';
const NODE_VERSIONS = [10, 12];
const LATEST_NODE_VERSION = 12;

function execDocker(args) {
  console.log(`docker ${args.join(' ')}`);
  return execa('docker', args, {
    stdio: 'inherit',
  });
}

async function buildBaseImages() {
  for (nodeVersion of NODE_VERSIONS) {
    await buildBaseImage({ nodeVersion });
    await buildBaseImage({ nodeVersion, alpine: true });
  }
}

async function buildBaseImage({ nodeVersion, alpine }) {
  let tmpImg = `strapi/base:tmp`;

  await execDocker([
    'build',
    '--build-arg',
    `NODE_VERSION=${nodeVersion}${alpine ? '-alpine' : ''}`,
    '-t',
    tmpImg,
    `./base${alpine ? '/alpine' : ''}`,
  ]);

  const tags = buildBaseTags({ nodeVersion, alpine });

  for (let tag of tags) {
    await execDocker(['tag', tmpImg, `strapi/base:${tag}`]);
  }

  await execDocker(['image', 'rm', tmpImg]);
}

async function buildStrapiImages() {
  let version = process.env.STRAPI_VERSION;
  if (version === 'latest' || !version) {
    version = await getLatestStrapiRelease();
  }

  if (semver.valid(version) === null) {
    throw new Error('Invalid strapi version provided: ' + version);
  }

  for (nodeVersion of NODE_VERSIONS) {
    await buildStrapiImage({ nodeVersion, version });
    await buildStrapiImage({ nodeVersion, version, alpine: true });
  }
}

async function buildStrapiImage({ nodeVersion, version, alpine = false }) {
  let tmpImg = `strapi/strapi:tmp`;

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
    await execDocker(['tag', tmpImg, `strapi/strapi:${tag}`]);
  }

  await execDocker(['image', 'rm', tmpImg]);
}

function buildStrapiTags({ version, nodeVersion, alpine = false }) {
  let tags = [];
  let versions = [version];

  const major = semver.major(version);
  const minor = semver.minor(version);
  const patch = semver.patch(version);
  const pre = semver.prerelease(version);

  if (!pre) {
    versions = [major, `${major}.${minor}`, `${major}.${minor}.${patch}`];
  }

  for (version of versions) {
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

function buildBaseTags({ nodeVersion, alpine = false }) {
  let tags = [];

  tags.push(`${nodeVersion}${alpine ? '-alpine' : ''}`);

  if (nodeVersion === LATEST_NODE_VERSION && !alpine) {
    tags.push('latest');
  }

  return tags;
}

const argv = yargs
  .option('type', {
    alias: 't',
    describe: 'Which images to build (all,strapi,base)',
    default: 'all',
    type: 'string',
  })
  .version(false)
  .help('h')
  .alias('h', 'help').argv;

if (argv.help) {
  yargs.showHelp();
}

async function run() {
  switch (argv.type) {
    case 'base': {
      await buildBaseImages();
      break;
    }
    case 'strapi': {
      await buildStrapiImages();
      break;
    }
    case 'all':
    default: {
      await buildBaseImages();
      await buildStrapiImages();
      break;
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});

async function getLatestStrapiRelease() {
  const { body } = await got(
    `https://api.github.com/repos/${REPO}/releases/latest`,
    { json: true }
  );

  return body.tag_name.slice(1); // remove the v prefix
}
