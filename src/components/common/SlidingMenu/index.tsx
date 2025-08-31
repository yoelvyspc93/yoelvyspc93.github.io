'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/utils/navigation';
import { getNavigationItems } from '@/constants/navigator';
import { useTranslation } from '@/hooks/useTranslation';
import { useViewports } from '@/hooks/useViewports';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { clsx } from 'clsx';
import styles from './SlidingMenu.module.scss';

const stairs = {
  desktop: 3,
  tablet: 3,
  mobile: 2,
};

export default function SlidingMenu() {
  const { breakpoint } = useViewports();
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const stairsRef = useRef<HTMLDivElement[]>([]);
  const linksRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && overlayRef.current && e.target === overlayRef.current) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!overlayRef.current || stairsRef.current.length === 0) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (isOpen) {
      tl.set(overlayRef.current, { pointerEvents: 'auto', opacity: 0 })
        .to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0)
        .to(
          stairsRef.current,
          {
            height: '100vh',
            duration: 0.5,
            stagger: 0.1,
          },
          0.2,
        );

      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
          },
          0.5,
        );
      }
    } else {
      if (linksRef.current) {
        tl.to(
          linksRef.current.children,
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            stagger: 0.08,
          },
          0,
        );
      }

      tl.to(
        stairsRef.current,
        {
          height: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.in',
        },
        0.2,
      ).to(
        overlayRef.current,
        { opacity: 0, duration: 0, pointerEvents: 'none' },
        1,
      );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const handleItemClick = (href: string) => {
    if (pathname === '/') {
      gsap.to(globalThis, { duration: 1, scrollTo: href });
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };

  const navItems = getNavigationItems(t);

  if (breakpoint === 'desktop') return null;

  const numStairs = stairs[breakpoint];

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button
          className={styles.burger}
          aria-label={t('openMenu', { defaultValue: 'Open menu' })}
          onClick={() => setIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      )}

      <div
        ref={overlayRef}
        className={clsx(styles.overlay, { [styles.open]: isOpen })}
        role="dialog"
        aria-modal="true"
        aria-label={t('navigationMenu', { defaultValue: 'Navigation menu' })}
      >
        <div className={styles.stairsContainer}>
          {Array.from({ length: numStairs }).map((_, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) stairsRef.current[idx] = el;
              }}
              className={styles.stair}
              style={{ width: `${100 / numStairs}%` }}
            />
          ))}
        </div>

        <div className={styles.menu}>
          <button
            className={styles.close}
            aria-label={t('closeMenu', { defaultValue: 'Close menu' })}
            onClick={() => setIsOpen(false)}
          >
            <span />
            <span />
          </button>

          <ul ref={linksRef} className={styles.linksList}>
            {navItems.map(({ name, path }) => (
              <li key={path} className={styles.linkItem}>
                <button
                  onClick={() => handleItemClick(path)}
                  className={styles.linkButton}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
