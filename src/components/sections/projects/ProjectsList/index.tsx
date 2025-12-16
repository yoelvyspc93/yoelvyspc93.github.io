'use client';

import { ProjectItem } from '@/components/shared/ProjectItem';
import { projectsData } from '@/constants/projects';

import styles from './ProjectsList.module.scss';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ProjectsList = () => {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Clean animation
    gsap.set(itemsRef.current, { opacity: 0, y: 50 });

    for (const [index, item] of itemsRef.current.entries()) {
      if (!item) continue;
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
        },
      });
    }

    return () => {
      for (const trigger of ScrollTrigger.getAll()) trigger.kill();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {projectsData.map((projectData, index) => {
          return (
            <article
              id={`project-${projectData.id}`}
              key={projectData.id}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
            >
              <ProjectItem
                id={projectData.id}
                title={projectData.title}
                description={projectData.detailedDescription}
                imageUrl={projectData.imageUrl}
                technologies={projectData.techStack}
                align={index % 2 === 0 ? 'right' : 'left'}
                website={projectData.websiteUrl}
                effects={projectData.effects}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};
