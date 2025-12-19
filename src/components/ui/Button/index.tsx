'use client';

import { ReactNode } from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import { clsx } from 'clsx';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Button = ({
  type = 'button',
  children,
  onClick,
  href,
  external = false,
  className,
  ariaLabel,
}: ButtonProps) => {
  if (href && external) {
    return (
      <a
        href={href}
        className={clsx(styles.button, className)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
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
        className={clsx(styles.button, className)}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <span className={styles.button__dot} />
        <span className={styles.button__content}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={clsx(styles.button, className)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.button__dot} />
      <span className={styles.button__content}>{children}</span>
    </button>
  );
};
