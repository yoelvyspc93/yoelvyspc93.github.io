'use client';

import { ReactNode } from 'react';
import styles from './ProjectItem.module.scss';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import { CustomImage } from '@/components/ui/CustomImage';

interface Props {
  id: string;
  title: string;
  description: string[];
  technologies: ReactNode[];
  imageUrl: string;
  align: 'left' | 'right';
  website?: string;
  effects: {
    start: string;
    end: string;
    opacity: number;
  };
}

export const ProjectItem = ({
  id,
  title,
  description,
  technologies,
  imageUrl,
  website,
  align,
  effects,
}: Props) => {
  return (
    <div
      id={id}
      className={clsx(
        styles.container,
        align === 'left' && styles.container__left,
      )}
      style={{
        ['--start' as string]: effects.start,
        ['--end' as string]: effects.end,
        ['--opacity' as string]: effects.opacity,
      }}
      data-align={align}
    >
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description}>
          {description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </div>
        <div className={styles.technologiesWrapper}>
          <h3>Technologies</h3>
          <div className={styles.technologiesList}>
            {technologies.map((tech, index) => (
              <div key={index} className={styles.technology}>
                {tech}
              </div>
            ))}
          </div>
        </div>
        {website && (
          <Button href={website} ariaLabel="Go to website">
            Go to website
          </Button>
        )}
      </div>
      <div
        className={clsx(
          styles.imageWrapper,
          align === 'left' && styles.align_left,
        )}
      >
        <div className={styles.image}>
          <CustomImage
            src={imageUrl}
            alt={title}
            fill
            blur
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        </div>
      </div>
    </div>
  );
};
