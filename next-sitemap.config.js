const SITE_URL = 'https://yoelvyspc93.github.io';
const ENABLE_MULTILANGUAGE = false; // Set to true to generate multilingual sitemap (en, es)

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

  exclude: [
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    ...(ENABLE_MULTILANGUAGE ? ['/en', '/en/*'] : ['/es', '/es/*']),
  ],

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

    // Remove locale prefix
    if (normalizedPath.startsWith('/es')) {
      cleanPath = normalizedPath.slice(3); // Remove /es
    } else if (normalizedPath.startsWith('/en')) {
      cleanPath = normalizedPath.slice(3); // Remove /en
    }

    if (!cleanPath) cleanPath = '/';
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    if (cleanPath !== '/' && !cleanPath.endsWith('/')) cleanPath += '/';

    // Determine Priority
    if (cleanPath === '/') {
      transformation.priority = 1;
    } else if (cleanPath.startsWith('/projects')) {
      transformation.priority = 0.9;
    }

    if (ENABLE_MULTILANGUAGE) {
      const enUrl = `${SITE_URL}${cleanPath}`;
      const esUrl = `${SITE_URL}/es${cleanPath}`;

      transformation.alternateRefs = [
        { href: enUrl, hreflang: 'en', hrefIsAbsolute: true },
        { href: esUrl, hreflang: 'es', hrefIsAbsolute: true },
        { href: enUrl, hreflang: 'x-default', hrefIsAbsolute: true },
      ];
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
