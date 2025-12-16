import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './TextAreaField.module.scss';

interface Props {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholders?: string[];
  interval?: number;
  'aria-describedby'?: string;
}

export const TextAreaField = ({
  label,
  id,
  value,
  onChange,
  placeholders = [],
  interval = 5000,
  'aria-describedby': ariaDescribedby,
}: Props) => {
  const [current, setCurrent] = useState(0);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el || placeholders.length === 0) return;
    const tl = gsap.timeline({ repeat: -1 });
    tlRef.current = tl;

    for (const [i] of placeholders.entries()) {
      tl.call(() => setCurrent(i < placeholders.length ? i : 0));
      tl.fromTo(
        el,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out' },
      );
      tl.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        delay: interval / 1000 - 1,
        ease: 'power1.in',
      });
    }

    return () => {
      tl.kill();
    };
  }, [placeholders, interval]);

  useEffect(() => {
    const el = placeholderRef.current;
    const tl = tlRef.current;
    if (!el || !tl) return;
    if (value) {
      gsap.to(el, { y: -20, opacity: 0, duration: 0.3, ease: 'power1.out' });
      tl.pause();
    } else {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: () => {
          if (tl) {
            tl.resume();
          }
        },
      });
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.textareaWrapper}>
        <textarea
          id={id}
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={ariaDescribedby}
        />
        <span ref={placeholderRef} className={styles.placeholder}>
          {placeholders[current]}
        </span>
      </div>
    </div>
  );
};
