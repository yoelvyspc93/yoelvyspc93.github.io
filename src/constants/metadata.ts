import type { Metadata } from 'next';

import projectsLocale from '@/public/locales/en/projects.json';
import contactLocale from '@/public/locales/en/contact.json';

const SITE_URL =
  process.env?.NEXT_PUBLIC_SITE_URL || 'https://yoelvyspc93.github.io';

const description =
  'I am Yoelvys, a frontend developer specialized in Next.js, React, and modern technologies. Explore my portfolio featuring innovative projects, advanced animations, and scalable solutions.';

const title = 'Yoelvys | Frontend Developer';

const languageUrls = {
  en: SITE_URL,
  es: `${SITE_URL}/es`,
};

const openGraphLocales: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
};

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: 'Yoelvys Perez Cabrera' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: `${SITE_URL}/images/seo/twitter-card.png`,
        alt: 'Yoelvys Portfolio Twitter Card Image',
      },
    ],
  },
};

const canonicalForLocale = (locale: string) =>
  locale === 'en' ? languageUrls.en : `${SITE_URL}/${locale}`;

export const buildMetadata = (locale: string): Metadata => {
  const canonical = canonicalForLocale(locale);
  const ogLocale = openGraphLocales[locale] ?? openGraphLocales.en;

  return {
    ...baseMetadata,
    alternates: {
      canonical,
      languages: {
        en: languageUrls.en,
        es: languageUrls.es,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Yoelvys Portfolio',
      images: [
        {
          url: `${SITE_URL}/images/seo/og-image.png`,
          width: 1000,
          height: 500,
          alt: 'Yoelvys Portfolio Open Graph Image',
        },
      ],
      locale: ogLocale,
      alternateLocale: Object.values(openGraphLocales).filter(
        (value) => value !== ogLocale,
      ),
      type: 'website',
    },
  };
};

type ProjectCopy = (typeof projectsLocale)['list'][string];

const projectsSchema = Object.entries(projectsLocale.list).map(
  ([id, project]: [string, ProjectCopy]) => {
    const projectData = project as ProjectCopy;
    const data = projectData.detailedDescription ?? [];
    return {
      '@type': 'CreativeWork',
      name: projectData.title,
      description: data.join(' '),
      identifier: id,
      url: `${SITE_URL}/projects#project-${id}`,
    };
  },
);

const faqEntries = [
  {
    '@type': 'Question',
    name: 'How can Yoelvys help my team?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'I design and build performant web interfaces using React and Next.js, focusing on measurable improvements for product teams.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I request a project estimate?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Share your goals and timeline through the contact form or email me at yoelvyspc93@gmail.com and I will reply within one business day.',
    },
  },
];

export const buildSchemaData = (locale: string) => {
  const localeUrl = canonicalForLocale(locale);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yoelvys Pérez Cabrera',
      email: 'yoelvyspc93@gmail.com',
      telephone: '+53 54773819',
      birthDate: '1993-07-06',
      url: localeUrl,
      jobTitle: 'Frontend Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Dspot Sp. z o.o.',
        url: 'https://www.dspot.com.pl',
      },
      sameAs: [SITE_URL, 'https://linkedin.com/in/yoelvys'],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Villa Clara',
        addressCountry: 'CU',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Universidad Central de Las Villas',
        url: 'https://www.uclv.edu.cu',
      },
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Yoelvys Portfolio',
      url: localeUrl,
      email: 'yoelvyspc93@gmail.com',
      sameAs: [SITE_URL, 'https://linkedin.com/in/yoelvys'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: title,
      url: localeUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${SITE_URL}/projects`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Highlighted projects',
      itemListElement: projectsSchema.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: project,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntries,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Yoelvys',
      url: `${localeUrl}#contact`,
      description: contactLocale.description.join(' '),
    },
  ];
};
