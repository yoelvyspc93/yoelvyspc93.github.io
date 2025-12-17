'use client';
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.scss';
import { ABOUT } from '@/constants/content';

export function About() {
  const container = useRef<HTMLElement | null>(null);
  const description = ABOUT.description;

  const content = useMemo(() => {
    return description.map((paragraph, index) => (
      <p key={`p-${index}`} className={styles.paragraph}>
        {paragraph.split(' ').map((word, i) => (
          <span key={`w-${index}-${i}`} className={styles.word}>
            <span data-animate="about-char">{word}</span>
          </span>
        ))}
      </p>
    ));
  }, [description]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLSpanElement>(
        'span[data-animate="about-char"]',
      );

      if (elements.length === 0) {
        return;
      }

      gsap.set(elements, { opacity: 0.1 });
      gsap.to(elements, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: '40% 90%',
          end: `+=${window.innerHeight / 2.5}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [description]);

  return (
    <section id="about" ref={container} className={styles.about}>
      <div className={styles.content}>{content}</div>
    </section>
  );
}
