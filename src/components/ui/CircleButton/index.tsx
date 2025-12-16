import { ArrowIcon } from '@/components/ui/Icons';
import styles from './CircleButton.module.scss';

interface Props {
  ariaLabel?: string;
}

export const CircleButton = ({ ariaLabel = 'circle button' }: Props) => {
  return (
    <span
      aria-label={ariaLabel}
      className={styles.circle_button}
      aria-hidden="true"
    >
      <ArrowIcon />
    </span>
  );
};
