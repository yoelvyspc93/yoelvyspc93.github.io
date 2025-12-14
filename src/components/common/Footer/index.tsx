'use client';

import styles from './Footer.module.scss';

import { getNavigationItems } from '@/constants/navigator';
import { gsap } from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import { CustomImage } from '../CustomImage';
import { COMMON } from '@/constants/content';

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickItem = (href: string) => {
    if (pathname === '/') {
      gsap.to(globalThis, { duration: 1, scrollTo: href });
    } else {
      router.push(`/${href}`);
    }
  };

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
        </nav>
      </div>
    </footer>
  );
};
