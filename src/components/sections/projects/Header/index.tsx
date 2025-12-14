'use client';

import styles from './Header.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { PROJECTS_SECTION } from '@/constants/content';

export const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    gsap.set(header, { opacity: 0, y: 50 });

    gsap.to(header, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        once: true,
      },
    });

    return () => {
      for (const trigger of ScrollTrigger.getAll()) trigger.kill();
    };
  }, []);

  return (
    <section className={styles.section} ref={headerRef}>
      <h1>
        {PROJECTS_SECTION.main} <span>{PROJECTS_SECTION.mainHighlight}</span>
      </h1>
      <p>
        I designed and developed the Henig Diamond landing page using Webflow,
        integrating GSAP for smooth animations and Spline for 3D visual
        elements.
      </p>
    </section>
  );
};
