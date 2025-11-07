'use client';

import styles from './Footer.module.scss';

import { getNavigationItems } from '@/constants/navigator';
import { useTranslation } from '../../../hooks/useTranslation';
import { Link, usePathname, routing } from '@/utils/navigation';
import { CustomImage } from '../CustomImage';
import { useLocale } from 'next-intl';
import { MouseEvent } from 'react';

export const Footer = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const locale = useLocale();

  const localeHomePath = locale === routing.defaultLocale ? '/' : `/${locale}`;

  const handleClickItem = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('#') && pathname === localeHomePath) {
      event.preventDefault();
      const target = document.querySelector<HTMLElement>(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = getNavigationItems(t).filter(
    (link) => link.name !== t('nav.home') && link.name !== t('nav.contact'),
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.background} aria-hidden>
        <CustomImage
          src="/images/footer/yoelvys.svg"
          alt="Yoelvys"
          fill
          className={styles.bgImage}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.copyrightText}>{t('footer.copyright')}</p>

        <nav className={styles.navMenu} aria-label="Footer navigation">
          <ul>
            {navigationLinks.map((link) => {
              const hash = link.path.startsWith('#')
                ? link.path.replace('#', '')
                : undefined;

              return (
                <li key={link.name}>
                  <Link
                    href={hash ? { pathname: '/', hash } : link.path}
                    className={styles.linkButton}
                    onClick={(event) => handleClickItem(event, link.path)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a href="/llms.txt" className={styles.linkButton}>
                {t('footer.llmPolicy', {
                  defaultValue: 'LLM Policy',
                })}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
