import { metadata as seo } from '@/constants/metadata';
import { Metadata } from 'next';
import HomeView from '@/components/sections/home/HomeView';

export const metadata: Metadata = {
  ...seo,
  openGraph: {
    ...seo.openGraph,
    url: '/',
    locale: 'en',
  },
};

export default function RootPage() {
  return <HomeView />;
}
