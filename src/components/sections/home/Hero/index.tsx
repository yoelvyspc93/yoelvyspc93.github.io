'use client';

import { useEffect, useRef, useState } from 'react';
import { Shader, Swirl, ChromaFlow } from 'shaders/react';
import styles from './Hero.module.scss';
import { Button } from '@/components/common/Button';

export default function Hero() {
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector('canvas');
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = globalThis.setInterval(() => {
      if (checkShaderReady()) {
        globalThis.clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = globalThis.setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      globalThis.clearInterval(intervalId);
      globalThis.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div
        ref={shaderContainerRef}
        className={`${styles.shaderContainer} ${
          isLoaded ? styles.visible : styles.hidden
        }`}
      >
        <Shader className={styles.shaderCanvas}>
          <Swirl
            colorA="#000000"
            colorB="#000000"
            speed={0.2}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#121212"
            upColor="#121212"
            downColor="#121212"
            leftColor="#86a7ff"
            rightColor="#9bcffc"
            intensity={1}
            radius={1.8}
            momentum={50}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className={styles.shaderOverlay} />
      </div>

      <nav
        className={`${styles.nav} ${
          isLoaded ? styles.visibleDelayed : styles.hidden
        }`}
      >
        <button className={styles.brandButton}>
          <div className={styles.brandIcon}>
            <span>A</span>
          </div>
          <span className={styles.brandText}>Acme Studio</span>
        </button>

        <div className={styles.navLinks}>
          {['Home', 'Work', 'Services', 'About', 'Contact'].map((item) => (
            <button key={item} className={styles.navLink}>
              <span>{item}</span>
              <span className={styles.navUnderline} />
            </button>
          ))}
        </div>

        <Button>Get Started</Button>
      </nav>

      <section
        className={`${styles.hero} ${
          isLoaded ? styles.visibleDelayedStrong : styles.hidden
        }`}
      >
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <p>WebGL Powered Design</p>
          </div>

          <h1 className={styles.heroTitle}>
            Creative experiences
            <br />
            in fluid motion
          </h1>

          <p className={styles.heroSubtitle}>
            Transforming digital spaces with dynamic shader effects and
            real-time visual experiences that captivate and inspire.
          </p>

          <div className={styles.heroActions}>
            <Button>Open in v0</Button>

            <Button>View Demo</Button>
          </div>
        </div>

        <div className={styles.scrollHint}>
          <p className={styles.scrollLabel}>Scroll to explore</p>
          <div className={styles.scrollPill}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </section>
    </main>
  );
}
