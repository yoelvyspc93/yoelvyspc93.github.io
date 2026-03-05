import { readFile, writeFile } from 'node:fs/promises'

const SITE_URL = 'https://yoelvyspc93.github.io'

const seoData = JSON.parse(
	await readFile(new URL('../src/content/seo.json', import.meta.url), 'utf8'),
)

const lastmod = new Date(seoData.updatedAt || Date.now()).toISOString()
const routes = ['/', '/projects/']

const urls = routes
	.map(
		(pathname) => `  <url>\n    <loc>${SITE_URL}${pathname}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
	)
	.join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await writeFile(
	new URL('../public/sitemap.xml', import.meta.url),
	sitemap,
	'utf8',
)
