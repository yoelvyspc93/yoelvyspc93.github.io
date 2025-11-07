import '@/styles/app.scss';

import { ReactNode } from 'react';
import { buildMetadata, buildSchemaData } from '@/constants/metadata';
import type { Metadata } from 'next';
import { Navigator } from '@/components/common/Navigator';
import JsonLdSchema from '@/components/common/JsonLdSchema';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/utils/navigation';
import { loadMessages } from '@/utils/request';
import ConsoleBanner from '@/components/common/ConsoleBanner';
import SlidingMenu from '@/components/common/SlidingMenu';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return buildMetadata(locale);
}

export const generateStaticParams = () =>
  routing.locales.map((locale: string) => ({ locale }));

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: { locale: string } }>) {
  const { locale } = params;

  setRequestLocale(locale);
  const messages = await loadMessages(locale);
  const schema = buildSchemaData(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConsoleBanner />
          <div className="page">
            <Navigator />
            <SlidingMenu />
            {children}
          </div>
          <JsonLdSchema schemaData={schema} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
