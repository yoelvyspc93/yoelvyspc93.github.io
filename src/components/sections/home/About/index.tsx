'use client';
import { useRef, type ReactNode } from 'react';
import Lottie from 'lottie-react';
import { ABOUT } from '@/constants/content';
import styles from './About.module.scss';

import developer from '@/public/lotties/developer.json';
import rocket from '@/public/lotties/rocket.json';
import idea from '@/public/lotties/idea.json';
import lightning from '@/public/lotties/lightning.json';
import tools from '@/public/lotties/tools.json';
import brain from '@/public/lotties/brain.json';
import target from '@/public/lotties/target.json';

// Map emojis to their corresponding Lottie animations
const EMOJI_TO_LOTTIE: Record<string, { animation: unknown; label: string }> = {
  '👨‍💻': { animation: developer, label: 'developer' },
  '🚀': { animation: rocket, label: 'rocket' },
  '💡': { animation: idea, label: 'idea' },
  '⚡': { animation: lightning, label: 'lightning' },
  '🛠️': { animation: tools, label: 'tools' },
  '🧠': { animation: brain, label: 'brain' },
  '🎯': { animation: target, label: 'target' },
};

// Split text into graphemes (handles multi-byte characters like emojis)
function splitIntoGraphemes(text: string): string[] {
  const normalized = text.normalize('NFC').replaceAll('\u00A0', ' ');

  if ('Segmenter' in Intl) {
    const segmenter = new (
      Intl as unknown as {
        Segmenter: new () => {
          segment: (text: string) => Iterable<{ segment: string }>;
        };
      }
    ).Segmenter();
    return Array.from(segmenter.segment(normalized), (x) => x.segment);
  }

  return [...normalized];
}

function renderCharacter(char: string, index: number): ReactNode {
  const lottieData = EMOJI_TO_LOTTIE[char];

  if (lottieData) {
    return (
      <span key={index} data-char>
        <span className={styles.emoji} data-label={lottieData.label}>
          <Lottie
            animationData={lottieData.animation}
            className={styles.lottie}
            aria-hidden="true"
          />
        </span>
      </span>
    );
  }

  return (
    <span key={index} data-char>
      {char}
    </span>
  );
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  const words = ABOUT.description.split(/\s+/);

  return (
    <section id="about" ref={containerRef} className={styles.about}>
      <div className={styles.content}>
        {words.map((word, wordIndex) => {
          const graphemes = splitIntoGraphemes(word);

          return (
            <div key={wordIndex} className={styles.word}>
              {graphemes.map((char, charIndex) => {
                const globalIndex =
                  words
                    .slice(0, wordIndex)
                    .reduce((acc, w) => acc + splitIntoGraphemes(w).length, 0) +
                  charIndex;

                return (
                  <span
                    key={charIndex}
                    ref={(el) => {
                      if (el) charsRef.current[globalIndex] = el;
                    }}
                  >
                    {renderCharacter(char, charIndex)}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
