import { metadata as seo } from '@/constants/metadata';
import { Metadata } from 'next';
import HomeView from '@/components/sections/home/HomeView';

export const metadata: Metadata = {
  ...seo,
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      es: '/es',
      'x-default': '/',
    },
  },
  openGraph: {
    ...seo.openGraph,
    url: '/',
    locale: 'en',
  },
};

export default function RootPage() {
  return <HomeView />;
}
