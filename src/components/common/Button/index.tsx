'use client';

import { ReactNode } from 'react';
import styles from './Button.module.scss';
import { Link } from '@/utils/navigation';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  className?: string;
}

export const Button = ({
  type = 'button',
  children,
  onClick,
  href,
  className = '',
}: Props) => {
  if (href) {
    const isExternal =
      /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');
    const classes = className ? `${styles.button} ${className}` : styles.button;

    if (isExternal) {
      return (
        <a
          aria-label="button"
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.button__dot} />
          <span className={styles.button__content}>{children}</span>
        </a>
      );
    }

    return (
      <Link aria-label="button" href={href} className={classes}>
        <span className={styles.button__dot} />
        <span className={styles.button__content}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      aria-label="button"
      type={type}
      className={className ? `${styles.button} ${className}` : styles.button}
      onClick={onClick}
    >
      <span className={styles.button__dot} />
      <span className={styles.button__content}>{children}</span>
    </button>
  );
};
