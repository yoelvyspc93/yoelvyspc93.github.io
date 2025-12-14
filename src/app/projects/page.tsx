import { metadata as seo } from '@/constants/metadata';
import { Metadata } from 'next';
import ProjectsView from '@/components/sections/projects/ProjectsView';

export const metadata: Metadata = {
  ...seo,
  title: 'Projects | Yoelvys',
  alternates: {
    canonical: '/projects',
    languages: {
      en: '/projects',
      es: '/es/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    ...seo.openGraph,
    url: '/projects',
    locale: 'en',
  },
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
