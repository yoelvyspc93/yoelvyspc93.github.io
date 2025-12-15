'use client';

import { ReactNode } from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  external?: boolean;
  className?: string;
}

export const Button = ({
  type = 'button',
  children,
  onClick,
  href,
  external = false,
  className,
}: Props) => {
  if (href && external) {
    return (
      <a
        aria-label="button"
        href={href}
        className={`${styles.button} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.button__dot} />
        <span className={styles.button__content}>{children}</span>
      </a>
    );
  }

  if (href && !external) {
    return (
      <Link
        href={href}
        className={`${styles.button} ${className}`}
        onClick={onClick}
        aria-label="button"
      >
        <span className={styles.button__dot} />
        <span className={styles.button__content}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      aria-label="button"
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      <span className={styles.button__dot} />
      <span className={styles.button__content}>{children}</span>
    </button>
  );
};
