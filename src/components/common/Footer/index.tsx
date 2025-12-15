'use client';

import styles from './Footer.module.scss';

import { getNavigationItems } from '@/constants/navigator';
import { CustomImage } from '../CustomImage';
import { COMMON } from '@/constants/content';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.background} aria-hidden>
        <CustomImage
          src="/images/footer/yoelvys.svg"
          alt="Yoelvys"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.copyrightText}>{COMMON.footer.copyright}</p>

        <nav className={styles.navMenu} aria-label="Footer navigation">
          <ul>
            {getNavigationItems()
              .filter(
                (link) =>
                  link.name !== COMMON.nav.home &&
                  link.name !== COMMON.nav.contact,
              )
              .map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className={styles.linkButton}>
                    {link.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
