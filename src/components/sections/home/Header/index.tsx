'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { CustomImage } from '@/components/common/CustomImage';
import { useTranslation } from '@/hooks/useTranslation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './Header.module.scss';
import { Button } from '@/components/common/Button';
import { TagHeader } from '@/components/common/TagHeader';

type Props = {
  onDownloadCv?: () => void;
  onContact?: () => void;
};

export function Header({ onDownloadCv, onContact }: Props) {
  const { t } = useTranslation('header');
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: 'power2.out' },
    });

    if (!prefersReducedMotion) {
      tl.fromTo(`#hero-title`, { y: 24, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(
          `#hero-desc`,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.6',
        )
        .fromTo(
          `.${styles.buttons} > *`,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, stagger: 0.12 },
          '-=0.5',
        )
        .fromTo(
          `.${styles.image}`,
          { opacity: 0, x: 50 },
          { opacity: 0.8, x: 0 },
          '-=1.2',
        );
    }

    return () => {
      tl?.kill();
    };
  }, [prefersReducedMotion]);

  const tags = t.raw('tag') as string[];

  return (
    <header id="header" className={styles.header} role="presentation">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            {t('hello')} <span>{t('name')}</span>
          </h1>
          <p id="hero-desc" className={styles.description}>
            {t('description')}
          </p>

          <div className={styles.buttons}>
            <Button aria-label={t('download')} onClick={onDownloadCv}>
              {t('download')}
            </Button>

            <Button aria-label={t('contact')} onClick={onContact}>
              {t('contact')}
            </Button>
          </div>
        </div>
        <div className={styles.image}>
          {tags.map((tag) => (
            <TagHeader key={tag} label={tag} className={styles.tagHeader} />
          ))}
          <CustomImage
            src="/images/header/avatar.webp"
            alt="Header"
            fill
            priority
          />
        </div>
      </div>
    </header>
  );
}
