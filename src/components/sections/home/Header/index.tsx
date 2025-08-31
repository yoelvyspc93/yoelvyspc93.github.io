'use client';

import { MouseEvent, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomImage } from '@/components/common/CustomImage';
import { useTranslation } from '@/hooks/useTranslation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './Header.module.scss';
import { Button } from '@/components/common/Button';

type Props = {
  onDownloadCv?: () => void;
  onContact?: () => void;
};

const backgroundImages = [
  {
    label: 'storybook',
    url: '/images/header/storybook.webp',
    width: 262,
    height: 262,
  },
  {
    label: 'chromatic',
    url: '/images/header/chromatic.webp',
    width: 115,
    height: 115,
  },
  {
    label: 'nextjs',
    url: '/images/header/nextjs.webp',
    width: 288,
    height: 288,
  },
  {
    label: 'cypress',
    url: '/images/header/cypress.webp',
    width: 134,
    height: 134,
  },
  {
    label: 'react',
    url: '/images/header/react.webp',
    width: 250,
    height: 250,
  },
  {
    label: 'typescript',
    url: '/images/header/typescript.webp',
    width: 260,
    height: 260,
  },
];

const lerp = (start: number, target: number, amount: number) =>
  start * (1 - amount) + target * amount;

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
          `.${styles.brands} > *`,
          { opacity: 0, y: 20 },
          { opacity: 0.8, y: 0, stagger: 0.08 },
          '-=0.6',
        );
    }

    return () => {
      tl?.kill();
    };
  }, [prefersReducedMotion]);

  const backgroundImagesRef = useRef<HTMLLIElement[]>([]);

  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.03;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);

    gsap.set(backgroundImagesRef.current[0], {
      x: `+=${xForce * -0.04}`,
      y: `+=${yForce * 0.04}`,
    });
    gsap.set(backgroundImagesRef.current[1], {
      x: `+=${xForce * 0.15}`,
      y: `+=${yForce * -0.15}`,
    });
    gsap.set(backgroundImagesRef.current[2], {
      x: `+=${xForce * 0.05}`,
      y: `+=${yForce * -0.05}`,
    });
    gsap.set(backgroundImagesRef.current[3], {
      x: `+=${xForce * -0.1}`,
      y: `+=${yForce * -0.1}`,
    });
    gsap.set(backgroundImagesRef.current[4], {
      x: `+=${xForce * -0.04}`,
      y: `+=${yForce * 0.04}`,
    });
    gsap.set(backgroundImagesRef.current[5], {
      x: `+=${xForce * -0.05}`,
      y: `+=${yForce * 0.05}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrame(animate);
    } else {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
        requestAnimationFrameId = null;
      }
    }
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  return (
    <header
      id="header"
      className={styles.header}
      onMouseMove={manageMouseMove}
      role="presentation"
    >
      <ul className={styles.brands} aria-hidden="true">
        {backgroundImages.map((image, index) => (
          <li
            key={image.label}
            className={styles.brandItem}
            ref={(el) => {
              if (el) {
                backgroundImagesRef.current[index] = el;
              }
            }}
          >
            <CustomImage
              className={styles.brand}
              src={image.url}
              alt={image.label}
              width={image.width}
              height={image.height}
              priority
            />
          </li>
        ))}
      </ul>
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
      </div>
    </header>
  );
}
