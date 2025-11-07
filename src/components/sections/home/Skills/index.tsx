'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import styles from './Skills.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function randomBetween(min: number, max: number): number {
  const buf = globalThis.crypto.getRandomValues(new Uint8Array(1));
  return (buf[0] / 255) * (max - min) + min;
}

export const Skills: React.FC = () => {
  const { t } = useTranslation('skills');
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const rafRef = useRef<number | null>(null);

  const categories = useMemo(
    () => t.raw('list') as { title: string; items: string[] }[],
    [t],
  );

  const skills = useMemo(
    () =>
      categories.flatMap((category) =>
        category.items.map((label) => ({
          label,
          category: category.title,
        })),
      ),
    [categories],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const matter = await import('matter-js');
      if (cancelled) return;

      const { Engine, World, Bodies, Runner, Body, Mouse, MouseConstraint } =
        matter;

      const sectionEl = sectionRef.current;
      const dragEl = layerRef.current;
      if (!sectionEl || !dragEl) return;

      const engine = Engine.create();
      const runner = Runner.create();
      const { world } = engine;
      world.gravity.y = 1;

      sectionEl.style.touchAction = 'pan-y';

      const rect = sectionEl.getBoundingClientRect();
      const sectionWidth = rect.width;
      const sectionHeight = rect.height;

      const ground = Bodies.rectangle(
        sectionWidth / 2,
        sectionHeight + 50,
        sectionWidth,
        100,
        { isStatic: true, restitution: 0.4, friction: 0.5 },
      );
      const leftWall = Bodies.rectangle(
        -50,
        sectionHeight / 2,
        100,
        sectionHeight * 2,
        { isStatic: true },
      );
      const rightWall = Bodies.rectangle(
        sectionWidth + 50,
        sectionHeight / 2,
        100,
        sectionHeight * 2,
        { isStatic: true },
      );
      World.add(world, [ground, leftWall, rightWall]);

      const mouse = Mouse.create(dragEl);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.8,
          render: { visible: false },
        },
      });
      World.add(world, mouseConstraint);

      const bodies = cardRefs.current
        .map((card) => {
          if (!card) return null;
          const w = card.offsetWidth;
          const h = card.offsetHeight;
          const x = randomBetween(w / 2, sectionWidth - w / 2);
          const y = -h - randomBetween(0, 200);

          gsap.set(card, { x: x - w / 2, y: y - h / 2, rotation: 0 });

          const body = Bodies.rectangle(x, y, w, h, {
            restitution: 0.4,
            friction: 0.3,
            frictionAir: 0.02,
            angle: randomBetween(-Math.PI / 8, Math.PI / 8),
          });
          Body.setAngularVelocity(body, randomBetween(-0.05, 0.05));
          World.add(world, body);
          return body;
        })
        .filter((body): body is Body => body !== null);

      const sync = () => {
        for (const [index, body] of bodies.entries()) {
          const card = cardRefs.current[index];
          if (!card) continue;
          gsap.set(card, {
            x: body.position.x - card.offsetWidth / 2,
            y: body.position.y - card.offsetHeight / 2,
            rotation: (body.angle * 180) / Math.PI,
          });
        }
        rafRef.current = requestAnimationFrame(sync);
      };

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top center',
        onEnter: () => {
          Runner.run(runner, engine);
          if (rafRef.current == null)
            rafRef.current = requestAnimationFrame(sync);
        },
        onLeave: () => {
          Runner.stop(runner);
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        },
        onEnterBack: () => {
          Runner.run(runner, engine);
          if (rafRef.current == null)
            rafRef.current = requestAnimationFrame(sync);
        },
        onLeaveBack: () => {
          Runner.stop(runner);
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        },
      });

      const onResize = () => {
        const bounds = sectionEl.getBoundingClientRect();
        Body.setPosition(ground, {
          x: bounds.width / 2,
          y: bounds.height + 50,
        });
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', onResize);

      cleanup = () => {
        window.removeEventListener('resize', onResize);
        st.kill();
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        Runner.stop(runner);
        Engine.clear(engine);
        World.remove(world, mouseConstraint);
      };
    };

    setup();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [prefersReducedMotion, skills.length]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={styles.skills}
      aria-labelledby="skills-heading"
    >
      <div className={styles.info}>
        <h2 id="skills-heading" className={styles.title}>
          {t('title')} <span>{t('titleHighlight')}</span>
        </h2>
        <p className={styles.subtitle}>{t('description')}</p>
      </div>

      <div
        ref={layerRef}
        className={styles.layer}
        aria-hidden={prefersReducedMotion ? 'true' : undefined}
      >
        {!prefersReducedMotion && (
          <ul className={styles.skillList} aria-hidden>
            {skills.map((skill, idx) => (
              <li
                key={`${skill.category}-${skill.label}-${idx}`}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className={styles.skillCard}
                data-category={skill.category}
              >
                {skill.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.staticList}>
        {categories.map((category) => (
          <div key={category.title} className={styles.staticCategory}>
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
