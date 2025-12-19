'use client';

import styles from './Navigator.module.scss';
import { LiquidGlass } from '@/components/ui/LiquidGlass';
import { getNavigationItems } from '@/constants/navigator';
import { socialLinks } from '@/constants/social';
import { useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';

export const Navigator = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <LiquidGlass id="navigator-liquid-glass" />
      <div className={styles.navigator}>
        <ul>
          {getNavigationItems().map((link) => (
            <li key={link.name}>
              <Link href={link.path} className={styles.linkButton}>
                {link.name}
              </Link>
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
    </nav>
  );
};
