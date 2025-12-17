import { Metadata } from 'next';

const SITE_URL = 'https://yoelvyspc93.github.io';

const ROL = 'Senior Frontend Engineer';

const description =
  'I bridge the gap between design and engineering, building high-performance, scalable web applications with React, Next.js, and TypeScript. Focused on exceptional user experiences and technical excellence.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Yoelvys | ${ROL}`,
  alternates: {
    canonical: new URL(SITE_URL),
  },
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
    title: `Yoelvys | ${ROL}`,
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
    title: `Yoelvys | ${ROL}`,
    description,
    images: [
      {
        url: SITE_URL + '/images/seo/twitter-card.png',
        alt: 'Yoelvys Portfolio Twitter Card Image',
      },
    ],
  },
};
