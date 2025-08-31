'use client';
import { useEffect, useMemo, useRef, useCallback, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './About.module.scss';
import Lottie from 'lottie-react';

import developer from '@/public/lotties/developer.json';
import rocket from '@/public/lotties/rocket.json';
import idea from '@/public/lotties/idea.json';
import lightning from '@/public/lotties/lightning.json';
import tools from '@/public/lotties/tools.json';
import brain from '@/public/lotties/brain.json';
import target from '@/public/lotties/target.json';

interface SegmenterOptions {
  granularity: 'grapheme' | 'word' | 'sentence';
}

interface SegmentData {
  segment: string;
  index: number;
  input: string;
}

interface Segmenter {
  segment(input: string): Iterable<SegmentData>;
}

interface IntlWithSegmenter {
  Segmenter: {
    new (locale?: string, options?: SegmenterOptions): Segmenter;
  };
}

const normalize = (s: string) =>
  String(s ?? '')
    .normalize('NFC')
    .replaceAll('\u00A0', ' ');

const toGraphemes = (s: string) => {
  const str = normalize(s);
  if (typeof (Intl as IntlWithSegmenter)?.Segmenter === 'function') {
    const seg = new (Intl as IntlWithSegmenter).Segmenter(undefined, {
      granularity: 'grapheme',
    });
    return Array.from(seg.segment(str), (x: SegmentData) => x.segment);
  }
  return [...str];
};

const emojiMap: Record<string, ReactNode> = {
  '👨‍💻': (
    <div className={styles.emoji} aria-label="developer">
      <Lottie animationData={developer} className={styles.lottie} />
    </div>
  ),
  '🚀': (
    <div className={styles.emoji} aria-label="rocket">
      <Lottie animationData={rocket} className={styles.lottie} />
    </div>
  ),
  '💡': (
    <div className={styles.emoji} aria-label="idea">
      <Lottie animationData={idea} className={styles.lottie} />
    </div>
  ),
  '⚡': (
    <div className={styles.emoji} aria-label="lightning">
      <Lottie animationData={lightning} className={styles.lottie} />
    </div>
  ),
  '🛠️': (
    <div className={styles.emoji} aria-label="tools">
      <Lottie animationData={tools} className={styles.lottie} />
    </div>
  ),
  '🧠': (
    <div className={styles.emoji} aria-label="brain">
      <Lottie animationData={brain} className={styles.lottie} />
    </div>
  ),
  '🎯': (
    <div className={styles.emoji} aria-label="target">
      <Lottie animationData={target} className={styles.lottie} />
    </div>
  ),
};

export function About() {
  const { t } = useTranslation('about');
  const refs = useRef<HTMLSpanElement[]>([]);
  const container = useRef<HTMLElement | null>(null);

  const setRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      if (el) refs.current[index] = el;
    },
    [],
  );

  const renderContent = useCallback(
    (phrase: string) => {
      refs.current.length = 0;
      const words = normalize(phrase).split(/\s+/);
      let idx = 0;

      return words.map((w, wi) => (
        <div key={`w-${wi}`} className={styles.word}>
          {toGraphemes(w).map((g) => {
            const i = idx++;
            return (
              <span key={`c-${i}`} ref={setRef(i)}>
                {emojiMap[g] ?? g}
              </span>
            );
          })}
        </div>
      ));
    },
    [setRef],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(refs.current, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: '50% 90%',
          end: `+=${window.innerHeight / 2.5}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const phrase = t('description');
  const content = useMemo(() => renderContent(phrase), [phrase, renderContent]);

  return (
    <section ref={container} className={styles.about}>
      <div className={styles.content}>{content}</div>
    </section>
  );
}
