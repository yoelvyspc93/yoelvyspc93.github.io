import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const { Link, usePathname, useRouter, redirect } =
  createNavigation(routing);
