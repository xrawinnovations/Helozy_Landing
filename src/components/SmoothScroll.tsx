'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, MOTION_OK, ScrollTrigger } from '@/lib/gsap';

/** Lenis smooth scrolling, driven by GSAP's clock so ScrollTrigger scenes stay in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
