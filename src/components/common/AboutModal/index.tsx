import styles from './AboutModal.module.scss';
import { ABOUT } from '@/constants/content';

export const AboutModal = () => {
  // Using the single description for now as detailedDescriptions was missing in the source
  // Splitting by newline if needed or just wrapping in array
  const detailedDescriptions = [ABOUT.description];

  return (
    <div className={styles.about}>
      {detailedDescriptions.map((paragraph: string, index: number) => (
        <p key={index} className={styles.about__paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};
