'use client';
import { useEffect, useMemo, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.scss';
import Lottie from 'lottie-react';
import { ABOUT } from '@/constants/content';

import developer from '@/public/lotties/developer.json';
import rocket from '@/public/lotties/rocket.json';
import idea from '@/public/lotties/idea.json';
import lightning from '@/public/lotties/lightning.json';
import tools from '@/public/lotties/tools.json';
import brain from '@/public/lotties/brain.json';
import target from '@/public/lotties/target.json';

const normalize = (s: string) =>
  String(s ?? '')
    .normalize('NFC')
    .replaceAll('\u00A0', ' ');

const emojiAnimations: Record<string, { label: string; animation: unknown }> = {
  '[developer]': { label: 'developer', animation: developer },
  '[rocket]': { label: 'rocket', animation: rocket },
  '[idea]': { label: 'idea', animation: idea },
  '[lightning]': { label: 'lightning', animation: lightning },
  '[tools]': { label: 'tools', animation: tools },
  '[brain]': { label: 'brain', animation: brain },
  '[target]': { label: 'target', animation: target },
};

export function About() {
  const container = useRef<HTMLElement | null>(null);

  const phrase = ABOUT.description;

  const emojiNodes = useMemo<Record<string, ReactNode>>(() => {
    const nodes: Record<string, ReactNode> = {};

    for (const [token, config] of Object.entries(emojiAnimations)) {
      nodes[token] = (
        <div className={styles.emoji} data-label={config.label} aria-hidden>
          <Lottie animationData={config.animation} className={styles.lottie} />
        </div>
      );
    }

    return nodes;
  }, []);

  const content = useMemo(() => {
    const words = normalize(phrase).split(/\s+/);

    if (words.length === 0) {
      return null;
    }

    return words.map((word, index) => (
      <div key={`w-${index}`} className={styles.word}>
        <span data-animate="about-char" key={`c-${index}`}>
          {emojiNodes[word] ?? word}
        </span>
      </div>
    ));
  }, [emojiNodes, phrase]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLSpanElement>(
        'span[data-animate="about-char"]',
      );

      if (elements.length === 0) {
        return;
      }

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
  }, [phrase]);

  return (
    <section id="about" ref={container} className={styles.about}>
      <div className={styles.content}>{content}</div>
    </section>
  );
}
