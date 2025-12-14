import '@/styles/app.scss';

import { ReactNode } from 'react';
import { schemaData } from '@/constants/metadata';
import { Navigator } from '@/components/common/Navigator';
import JsonLdSchema from '@/components/common/JsonLdSchema';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { loadMessages } from '@/utils/request';
import ConsoleBanner from '@/components/common/ConsoleBanner';
import SlidingMenu from '@/components/common/SlidingMenu';

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  // Try to get locale from params, fallback to 'en' (for root pages)
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  setRequestLocale(locale);
  const messages = await loadMessages(locale);

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
          <JsonLdSchema schemaData={schemaData} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
