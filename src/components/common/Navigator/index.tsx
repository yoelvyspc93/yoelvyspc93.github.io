'use client';

import { usePathname, useRouter } from '@/utils/navigation';
import styles from './Navigator.module.scss';
import { getNavigationItems } from '@/constants/navigator';
import { socialLinks } from '@/constants/social';
import { featureFlags } from '@/constants/featureFlags';
import { useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocale } from 'next-intl';
import { LiquidGlass } from '../LiquidGlass';

export const Navigator = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const oppositeLang = locale === 'es' ? 'en' : 'es';

  const changeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const handleClickItem = (href: string) => {
    if (pathname === '/') {
      gsap.to(globalThis, {
        duration: 0.5,
        scrollTo: href,
        ease: 'power2.out',
      });
    } else {
      router.push(href);
    }
  };

  return (
    <nav className={styles.nav}>
      <LiquidGlass id="navigator-liquid-glass" />
      <div className={styles.navigator}>
        <ul>
          {getNavigationItems(t).map((link) => (
            <li key={link.name}>
              <button
                type="button"
                onClick={() => handleClickItem(link.path)}
                className={styles.linkButton}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.navigator}>
        <ul>
          {socialLinks.map((sm) => (
            <li key={sm.platform}>
              <a
                aria-label={`link to ${sm.platform}`}
                href={sm.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sm.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {featureFlags.showLanguage && (
        <div className={styles.navigator}>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => changeLanguage(oppositeLang)}
                className={styles.linkButton}
              >
                {t(`lang.${oppositeLang}`)}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
