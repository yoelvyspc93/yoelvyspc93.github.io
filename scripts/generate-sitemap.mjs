import { readFile, writeFile } from 'node:fs/promises'

const SITE_URL = 'https://yoelvyspc93.github.io'

const seoData = JSON.parse(
	await readFile(new URL('../src/content/seo.json', import.meta.url), 'utf8'),
)

const lastmod = new Date(seoData.updatedAt || Date.now()).toISOString()

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`

await writeFile(
	new URL('../public/sitemap.xml', import.meta.url),
	sitemap,
	'utf8',
)
