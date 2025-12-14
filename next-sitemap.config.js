/* eslint-disable unicorn/prefer-module */
const SITE_URL = 'https://yoelvyspc93.github.io';

const EXCLUDE = ['/api/*', '/_next/*', '/404', '/500'];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  basePath: '/',
  outDir: 'out',

  generateRobotsTxt: true,
  generateIndexSitemap: false,

  trailingSlash: true,
  autoLastmod: true,
  changefreq: 'weekly',
  priority: 1,

  exclude: EXCLUDE,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: EXCLUDE,
      },
    ],
  },
};
