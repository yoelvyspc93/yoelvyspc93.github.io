// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	site: 'https://yoelvyspc93.github.io',
	base: '/portfolio-astro',
	trailingSlash: 'always',
	vite: {
		plugins: [tailwindcss()],
	},
})
