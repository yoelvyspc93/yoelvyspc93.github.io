'use client';

import { ReactNode } from 'react';
import { ProjectImages } from '../ProjectImages';
import styles from './ProjectItem.module.scss';
import { clsx } from 'clsx';
import { Button } from '../Button';

interface Props {
  id: string;
  title: string;
  description: string[];
  technologies: ReactNode[];
  imagesUrl: string[];
  align: 'left' | 'right';
  website?: string;
}

export const ProjectItem = ({
  id,
  title,
  description,
  technologies,
  imagesUrl,
  website,
  align,
}: Props) => {
  return (
    <div
      id={`project-${id}`}
      className={clsx(
        styles.container,
        align === 'left' && styles.container__left,
      )}
    >
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
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
        {website && <Button href={website}>Go to website</Button>}
      </div>
      <div
        className={clsx(
          styles.imageWrapper,
          align === 'left' && styles.align_left,
        )}
      >
        <div className={styles.image}>
          <ProjectImages images={imagesUrl} />
        </div>
      </div>
    </div>
  );
};
