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
