import { projectsData } from '@/constants/projects';
import { SITE_URL } from './common';

export const projectsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/projects#collection`,
      url: `${SITE_URL}/projects`,
      name: 'Projects',
      description:
        'A curated selection of frontend and web development projects by Yoelvys Pérez Cabrera, focused on React, Next.js, performance, and modern UI/UX.',
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}#website` },
      about: { '@id': `${SITE_URL}#yoelvys` },
      mainEntity: {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/projects#list`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: projectsData.length,
        itemListElement: projectsData.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          //url: `${SITE_URL}${p.slug.startsWith('/') ? p.slug : `/${p.slug}`}`,
          item: {
            '@type': 'CreativeWork',
            '@id': `${SITE_URL}/projects/${p.id}`,
            name: p.title,
            description: p.shortDescription,
            // url: `${SITE_URL}/projects/${p.id}`,
            // dateCreated: '2024',
            creator: { '@id': `${SITE_URL}#yoelvys` },
            keywords: p.techStack,
            thumbnailUrl: p.imageUrl,
          },
        })),
      },
    },
  ],
};
