import { LiquidGlass } from '../LiquidGlass';
import styles from './TagHeader.module.scss';
import { clsx } from 'clsx';

interface TagHeaderProps {
  label: string;
  className?: string;
}

export const TagHeader = ({ label, className }: TagHeaderProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <LiquidGlass id="tag-header-liquid-glass" />
      <span className={styles.label}>{label}</span>
    </div>
  );
};
