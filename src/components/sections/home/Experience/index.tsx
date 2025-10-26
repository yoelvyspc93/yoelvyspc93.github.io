'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './Experience.module.scss';
import { CustomImage } from '@/components/common/CustomImage';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

type ExperienceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ExperienceItem = {
  period: string;
  company: string;
  paragraphs: string[];
};

const images: ExperienceImage[][] = [
  [
    {
      src: '/images/projects/flowsev.webp',
      alt: 'Code screen',
      width: 800,
      height: 600,
    },
    {
      src: '/images/projects/pioneerz.webp',
      alt: 'Typing close-up',
      width: 800,
      height: 600,
    },
    {
      src: '/images/projects/flowsev.webp',
      alt: 'Laptop with charts',
      width: 800,
      height: 600,
    },
    {
      src: '/images/projects/pioneerz.webp',
      alt: 'Code editor detail',
      width: 800,
      height: 600,
    },
  ],
  [
    {
      src: '/images/projects/pioneerz.webp',
      alt: 'Code screen',
      width: 800,
      height: 600,
    },
    {
      src: '/images/projects/flowsev.webp',
      alt: 'Typing close-up',
      width: 800,
      height: 600,
    },
  ],
  [
    {
      src: '/images/projects/flowsev.webp',
      alt: 'Code screen',
      width: 800,
      height: 600,
    },
    {
      src: '/images/projects/pioneerz.webp',
      alt: 'Typing close-up',
      width: 800,
      height: 600,
    },
  ],
];

export function Experience() {
  const { t } = useTranslation('experience');

  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLOListElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current!;
    const timeline = timelineRef.current!;
    const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`);
    const lineProgress = timeline.querySelector<HTMLElement>(
      `.${styles.lineProgress}`,
    );

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: timeline,
        start: `top top+=${window.innerHeight / 2}`,
        end: `bottom ${window.innerHeight / 2}`,
        scrub: true,
        onUpdate: (self) => {
          if (lineProgress) gsap.set(lineProgress, { scaleY: self.progress });
        },
      });

      for (const el of items) {
        const right = el.querySelector<HTMLElement>(`.${styles.right}`);

        if (right) {
          gsap.fromTo(
            right,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 50%',
                toggleActions: 'play none none none',
              },
            },
          );
        }
      }

      const onResize = () => ScrollTrigger.refresh();

      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const items = t.raw('list') as ExperienceItem[];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 id="experience-heading" className={styles.title}>
          {t('title')} <span>{t('titleHighlight')}</span>
        </h2>

        <ol ref={timelineRef} className={styles.timeline}>
          <div className={styles.line} aria-hidden>
            <span className={styles.lineProgress} />
          </div>

          {items.map((item, index) => (
            <li key={item.period} className={styles.item}>
              <div className={styles.marker} aria-hidden />
              <div className={styles.left}>
                <p className={styles.period}>{item.period}</p>
                <p className={styles.company}>{item.company}</p>
              </div>

              <div className={styles.right}>
                {item.paragraphs.map((p, i) => (
                  <p key={i} className={styles.paragraph}>
                    {p}
                  </p>
                ))}

                {images[index]?.length ? (
                  <div className={styles.gallery} role="list">
                    {images[index].map((img, i) => (
                      <div key={i} role="listitem" className={styles.thumb}>
                        <CustomImage
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          priority={false}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
