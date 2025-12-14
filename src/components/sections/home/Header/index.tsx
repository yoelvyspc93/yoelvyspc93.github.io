'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { CustomImage } from '@/components/common/CustomImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './Header.module.scss';
import { Button } from '@/components/common/Button';
import { TagHeader } from '@/components/common/TagHeader';
import { HEADER } from '@/constants/content';

type Props = {
  onDownloadCv?: () => void;
  onContact?: () => void;
};

export function Header({ onDownloadCv, onContact }: Props) {
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

  const tags = HEADER.tag;

  return (
    <header id="header" className={styles.header} role="presentation">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            {HEADER.hello} <span>{HEADER.name}</span>
          </h1>
          <p id="hero-desc" className={styles.description}>
            {HEADER.description}
          </p>

          <div className={styles.buttons}>
            <Button aria-label={HEADER.download} onClick={onDownloadCv}>
              {HEADER.download}
            </Button>

            <Button aria-label={HEADER.contact} onClick={onContact}>
              {HEADER.contact}
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
