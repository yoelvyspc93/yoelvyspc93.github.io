'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Skills.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Engine,
  World,
  Bodies,
  Runner,
  Body,
  Mouse,
  MouseConstraint,
} from 'matter-js';
import { SKILLS } from '@/constants/content';

function randomBetween(min: number, max: number): number {
  const buf = globalThis.crypto.getRandomValues(new Uint8Array(1));
  return (buf[0] / 255) * (max - min) + min;
}

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const engine = Engine.create();
    const { world } = engine;
    world.gravity.y = 1;
    const runner = Runner.create();

    const sectionEl = sectionRef.current!;
    const dragEl = layerRef.current!;
    const rect = sectionEl.getBoundingClientRect();
    const sectionWidth = rect.width;
    const sectionHeight = rect.height;

    sectionEl.style.touchAction = 'pan-y';

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
      {
        isStatic: true,
      },
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

    type MouseWithHandlers = typeof mouse & {
      mousewheel?: (e: WheelEvent) => void;
      touchmove?: (e: TouchEvent) => void;
      touchstart?: (e: TouchEvent) => void;
      touchend?: (e: TouchEvent) => void;
    };
    const mw = mouse as MouseWithHandlers;

    if (mw.mousewheel) {
      dragEl.removeEventListener('wheel', mw.mousewheel as EventListener);
      dragEl.removeEventListener('mousewheel', mw.mousewheel as EventListener);
      dragEl.removeEventListener(
        'DOMMouseScroll',
        mw.mousewheel as EventListener,
      );
    }

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
      .filter((b): b is Body => b !== null);

    const sync = () => {
      for (const [i, body] of bodies.entries()) {
        const card = cardRefs.current[i];
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
      const r = sectionEl.getBoundingClientRect();
      Body.setPosition(ground, { x: r.width / 2, y: r.height + 50 });
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      st.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Runner.stop(runner);
      Engine.clear(engine);
      for (const t of ScrollTrigger.getAll()) t.kill();
    };
  }, []);

  const skills = SKILLS.list;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={styles.skills}
      aria-labelledby="skills-heading"
    >
      <div className={styles.info}>
        <h2 id="skills-heading" className={styles.title}>
          {SKILLS.title} <span>{SKILLS.titleHighlight}</span>
        </h2>
        <p className={styles.subtitle}>{SKILLS.description}</p>
      </div>

      <div ref={layerRef} className={styles.layer}>
        {skills.map((skill, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) cardRefs.current[idx] = el;
            }}
            className={styles.skillCard}
            role="button"
            tabIndex={0}
            aria-label={skill}
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};
