import { Metadata } from 'next';

const SITE_URL = 'https://yoelvyspc93.github.io';
const SITE_NAME = 'Yoelvys Portfolio';
const ROL = 'Senior Frontend Engineer';

const description =
  'I bridge the gap between design and engineering, building high-performance, scalable web applications with React, Next.js, and TypeScript. Focused on exceptional user experiences and technical excellence.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Yoelvys | ${ROL}`,
  applicationName: SITE_NAME,
  description,
  keywords: [
    'Yoelvys',
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Web performance',
    'Accessibility',
  ],
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: new URL(SITE_URL),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    },
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: false,
  },
  authors: [{ name: 'Yoelvys Perez Cabrera' }],
  category: 'technology',
  colorScheme: 'dark',
  viewport: { width: 'device-width', initialScale: 1, viewportFit: 'cover' },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1021' },
  ],
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
    siteName: SITE_NAME,
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
