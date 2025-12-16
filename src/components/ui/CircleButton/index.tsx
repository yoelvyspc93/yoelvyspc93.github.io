import { ArrowIcon } from '@/components/ui/Icons';
import styles from './CircleButton.module.scss';

export const CircleButton = () => {
  return (
    <span
      aria-label="circle button"
      className={styles.circle_button}
      aria-hidden="true"
    >
      <ArrowIcon />
    </span>
  );
};
