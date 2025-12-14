import { ReactNode } from 'react';
import { metadata as seo } from '@/constants/metadata';
import { Metadata } from 'next';
import { routing } from '@/utils/navigation';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...seo,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/',
        es: '/es',
        'x-default': '/',
      },
    },
    openGraph: {
      ...seo.openGraph,
      url: `/${locale}`,
      locale,
    },
  };
}

export const generateStaticParams = () =>
  routing.locales
    .filter((locale) => locale !== 'en')
    .map((locale: string) => ({ locale }));

export default function LocaleLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
