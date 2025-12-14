const SITE_URL = 'https://yoelvyspc93.github.io';

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
  priority: 0.7,

  exclude: ['/api/*', '/_next/*', '/404', '/500'],

  transform: async (config, path) => {
    // Ensure path starts with /
    let normalizedPath = path;
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }

    const transformation = {
      loc: normalizedPath,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [],
    };

    // Calculate Clean Path
    let cleanPath = normalizedPath;
    if (cleanPath !== '/' && !cleanPath.endsWith('/')) cleanPath += '/';

    // Determine Priority
    if (cleanPath === '/') {
      transformation.priority = 1;
    } else if (cleanPath.startsWith('/projects')) {
      transformation.priority = 0.9;
    }

    return transformation;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*', '/404', '/500'],
      },
    ],
  },
};
