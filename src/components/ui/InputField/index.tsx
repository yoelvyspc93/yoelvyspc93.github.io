import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './InputField.module.scss';

interface Props {
  label: string;
  type?: 'text' | 'email';
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholders?: string[];
  interval?: number;
  'aria-describedby'?: string;
}

export const InputField = ({
  label,
  type = 'text',
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
    if (!placeholderRef.current || placeholders.length === 0) return;
    const tl = gsap.timeline({ repeat: -1 });
    tlRef.current = tl;

    for (const [i] of placeholders.entries()) {
      tl.call(() => setCurrent(i < placeholders.length ? i : 0));
      tl.fromTo(
        placeholderRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out' },
      );
      tl.to(placeholderRef.current, {
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

  // On input value change: animate placeholder up smoothly and pause/resume cycling
  useEffect(() => {
    if (!placeholderRef.current || !tlRef.current) return;
    if (value) {
      // hide placeholder and pause cycling
      gsap.to(placeholderRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
      });
      tlRef.current.pause();
    } else {
      // show placeholder, then resume cycling
      gsap.to(placeholderRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: () => {
          if (tlRef.current) {
            tlRef.current.resume();
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
      <div className={styles.inputWrapper}>
        <input
          autoComplete="off"
          type={type}
          id={id}
          className={styles.input}
          value={value}
          onChange={(evt) => onChange(evt.target.value)}
          aria-describedby={ariaDescribedby}
        />

        {/* Always render placeholder and animate via GSAP */}
        <span ref={placeholderRef} className={styles.placeholder}>
          {placeholders[current]}
        </span>
      </div>
    </div>
  );
};
