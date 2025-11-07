import '@/styles/app.scss';

import { Link } from '@/utils/navigation';
import { getTranslations } from 'next-intl/server';

export default async function LocaleNotFound({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'notFound' });
  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  return (
    <html lang={locale}>
      <body>
        <main className="not-found">
          <div className="not-found__inner">
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
            <Link href={homeHref} className="not-found__link">
              {t('cta')}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
