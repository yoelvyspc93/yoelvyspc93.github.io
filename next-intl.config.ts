import defineConfig from 'next-intl/config';

// @ts-expect-error The library's type definitions don't expose options yet
export default defineConfig({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
