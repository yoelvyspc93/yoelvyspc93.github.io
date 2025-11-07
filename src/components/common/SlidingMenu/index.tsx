'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { Link, usePathname, routing } from '@/utils/navigation';
import { getNavigationItems } from '@/constants/navigator';
import { useTranslation } from '@/hooks/useTranslation';
import { useViewports } from '@/hooks/useViewports';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { clsx } from 'clsx';
import styles from './SlidingMenu.module.scss';
import { useLocale } from 'next-intl';

const stairs = {
  desktop: 3,
  tablet: 3,
  mobile: 2,
};

export default function SlidingMenu() {
  const { breakpoint } = useViewports();
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
    if (
      !overlayRef.current ||
      !openButtonRef.current ||
      !closeButtonRef.current ||
      stairsRef.current.length === 0
    )
      return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (isOpen) {
      tl.to(openButtonRef.current, { opacity: 0, scale: 0.8, duration: 0.2 }, 0)
        .set(overlayRef.current, { pointerEvents: 'auto', opacity: 0 }, 0.1)
        .to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0.1)
        .to(
          stairsRef.current,
          {
            height: '100vh',
            duration: 0.5,
            stagger: 0.1,
          },
          0.3,
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
          0.6,
        );
      }

      tl.fromTo(
        closeButtonRef.current,
        { opacity: 0, scale: 0.8, rotation: -90 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'back.out(1.7)',
        },
        0.8,
      );
    } else {
      tl.to(
        closeButtonRef.current,
        { opacity: 0, scale: 0.8, rotation: 90, duration: 0.2 },
        0,
      );

      if (linksRef.current) {
        tl.to(
          linksRef.current.children,
          {
            opacity: 0,
            y: -20,
            duration: 0.3,
            stagger: 0.05,
          },
          0.1,
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
        0.3,
      )
        .to(
          overlayRef.current,
          { opacity: 0, duration: 0.2, pointerEvents: 'none' },
          0.7,
        )
        .fromTo(
          openButtonRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' },
          0.8,
        );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const localeHomePath = locale === routing.defaultLocale ? '/' : `/${locale}`;

  const handleItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('#') && pathname === localeHomePath) {
      event.preventDefault();
      gsap.to(globalThis, { duration: 1, scrollTo: href });
    }

    setIsOpen(false);
  };

  const navItems = getNavigationItems(t);

  if (breakpoint === 'desktop') return null;

  const numStairs = stairs[breakpoint];

  return (
    <div className={styles.container}>
      <button
        ref={openButtonRef}
        className={styles.burger}
        aria-label={t('openMenu', { defaultValue: 'Open menu' })}
        onClick={() => setIsOpen(true)}
        style={{
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        <span />
        <span />
      </button>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="liquid-glass-effect" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={26}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

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
            ref={closeButtonRef}
            className={styles.close}
            aria-label={t('closeMenu', { defaultValue: 'Close menu' })}
            onClick={() => setIsOpen(false)}
            style={{
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
          >
            <span />
            <span />
          </button>

          <ul ref={linksRef} className={styles.linksList}>
            {navItems.map(({ name, path }) => {
              const hash = path.startsWith('#')
                ? path.replace('#', '')
                : undefined;

              return (
                <li key={path} className={styles.linkItem}>
                  <Link
                    href={hash ? { pathname: '/', hash } : path}
                    className={styles.linkButton}
                    onClick={(event) => handleItemClick(event, path)}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
