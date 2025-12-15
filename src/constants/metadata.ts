import { Metadata } from 'next';

const SITE_URL = 'https://yoelvyspc93.github.io';

const description =
  'I am Yoelvys, a frontend developer specialized in Next.js, React, and modern technologies. Explore my portfolio featuring innovative projects, advanced animations, and scalable solutions.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Yoelvys | Frontend Developer',
  description,
  authors: [{ name: 'Yoelvys Perez Cabrera' }],
  //themeColor: '#1D212C',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    // apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: 'Yoelvys | Frontend Developer',
    description,
    url: SITE_URL || '',
    siteName: 'Yoelvys Portfolio',
    images: [
      {
        url: SITE_URL + '/images/seo/og-image.png',
        width: 1000,
        height: 500,
        alt: 'Yoelvys Portfolio Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yoelvys | Frontend Developer',
    description,
    images: [
      {
        url: SITE_URL + '/images/seo/twitter-card.png',
        alt: 'Yoelvys Portfolio Twitter Card Image',
      },
    ],
  },
};

export const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#yoelvys`,
  name: 'Yoelvys Pérez Cabrera',
  givenName: 'Yoelvys',
  familyName: 'Pérez Cabrera',
  alternateName: ['yoelvyspc93', 'Yoelvys'],
  url: SITE_URL,
  image: `${SITE_URL}/images/yoelvys-profile.jpg`,
  email: 'yoelvyspc93@gmail.com',
  telephone: '+53 54773819',
  birthDate: '1993-07-06',
  nationality: { '@type': 'Country', name: 'Cuba' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santa Clara',
    addressRegion: 'Villa Clara',
    addressCountry: 'CU',
  },
  knowsLanguage: ['es', 'en'],
  jobTitle: 'Frontend Developer',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Frontend Developer',
    occupationLocation: { '@type': 'Place', name: 'Remote' },
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Frontend Development',
    'Design Systems',
    'UI/UX',
    'Web Performance',
    'SEO',
    'GraphQL',
    'GSAP',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Dspot Sp. z o.o.',
    url: 'https://www.dspot.com.pl',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Universidad Central de Las Villas',
    url: 'https://www.uclv.edu.cu',
  },
  sameAs: [
    SITE_URL,
    'https://linkedin.com/in/yoelvys',
    'https://github.com/yoelvyspc93',
  ],
  mainEntityOfPage: SITE_URL,
  description,
};
