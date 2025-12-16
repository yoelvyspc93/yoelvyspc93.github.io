import { ArrowIcon } from '@/components/ui/Icons';
import styles from './CircleButton.module.scss';

export const CircleButton = () => {
  return (
    <span className={styles.circle_button} aria-hidden="true">
      <ArrowIcon />
    </span>
  );
};
