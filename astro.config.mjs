// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

const isProduction = import.meta.env.PROD
console.log('isProduction', isProduction)

// https://astro.build/config
export default defineConfig({
	...(isProduction && {
		site: 'https://yoelvyspc93.github.io',
		base: '/portfolio-astro',
	}),
	trailingSlash: 'always',
	vite: {
		plugins: [tailwindcss()],
	},
})
