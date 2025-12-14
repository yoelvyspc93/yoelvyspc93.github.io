'use client';

import { useEffect, useRef, useState } from 'react';
import { ChromaFlow, Shader, Swirl } from 'shaders/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ShaderBackground.module.scss';

if (globalThis.window !== undefined) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShaderBackground() {
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const chromaFlowRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!isLoaded || !chromaFlowRef.current) return;

    const distance = 500;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chromaFlowRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: globalThis.document.documentElement,
            start: 'top top',
            end: `+=${distance}`,
            scrub: true,
            markers: false,
          },
        },
      );
    }, chromaFlowRef);

    return () => {
      ctx.revert();
    };
  }, [isLoaded]);

  return (
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
        <div ref={chromaFlowRef}>
          <ChromaFlow
            baseColor="#86a7ff"
            upColor="#9bcffc"
            downColor="#86a7ff"
            leftColor="#9bcffc"
            rightColor="#86a7ff"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
            ref={chromaFlowRef}
          />
        </div>
      </Shader>
      <div className={styles.shaderOverlay} />
    </div>
  );
}
