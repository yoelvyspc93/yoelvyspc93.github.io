'use client';

import { projectsData } from '@/constants/projects';
import styles from './Projects.module.scss';
import { ProjectsCard } from '@/components/shared/ProjectsCard';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/Button';
import { PROJECTS_SECTION } from '@/constants/content';
import Link from 'next/link';

export const Projects = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const button = buttonRef.current;
    if (!section || !button) return;

    gsap.set(section.querySelector('h2'), { opacity: 0, y: 50 });
    gsap.set(button, { opacity: 0, y: 50 });
    for (const card of cardsRef.current) {
      if (card) gsap.set(card, { opacity: 0, y: 50 });
    }

    gsap.to(section.querySelector('h2'), {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
    });

    gsap.to(button, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: button, start: 'top 90%', once: true },
    });

    for (const card of cardsRef.current) {
      if (!card) continue;
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
    }

    return () => {
      for (const trigger of ScrollTrigger.getAll()) trigger.kill();
    };
  }, [prefersReducedMotion]);

  const moveSharedHover = (target: HTMLElement | null, fromMouse = false) => {
    if (fromMouse && !isHoveringRef.current) return;

    const hover = hoverRef.current;
    const list = listRef.current;
    if (!hover || !list || !target) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = target.getBoundingClientRect();

    const y = itemRect.top - listRect.top + list.scrollTop;
    const h = itemRect.height;

    gsap.to(hover, {
      opacity: 1,
      y,
      height: h,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  const hideSharedHover = () => {
    const hover = hoverRef.current;
    if (!hover) return;
    gsap.to(hover, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: true,
    });
  };

  const latestProjects = projectsData.filter((project) => project.isFavorite);

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <h2>
        {latestProjects.length} {PROJECTS_SECTION.latest}{' '}
        <span>{PROJECTS_SECTION.latestHighlight}</span>
      </h2>

      <div
        className={styles.list}
        ref={listRef}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          hideSharedHover();
        }}
        onBlur={hideSharedHover}
      >
        <div ref={hoverRef} className={styles.sharedHover} aria-hidden="true" />

        {latestProjects.map((projectData, index) => {
          return (
            <Link
              key={projectData.id}
              href={`/projects#project-${projectData.id}`}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={styles.cardWrapper}
              aria-label={`${projectData.title} project`}
              onMouseEnter={(e) => moveSharedHover(e.currentTarget, true)}
              onFocus={(e) => moveSharedHover(e.currentTarget)}
            >
              <ProjectsCard
                number={projectData.id}
                title={projectData.title}
                content={projectData.shortDescription}
              />
            </Link>
          );
        })}
      </div>

      <div ref={buttonRef}>
        <Button href="/projects" ariaLabel={PROJECTS_SECTION.seeMore}>
          {PROJECTS_SECTION.seeMore}
        </Button>
      </div>
    </section>
  );
};
