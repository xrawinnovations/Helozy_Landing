'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Animations only run for people who haven't asked their device to reduce motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
/** The pinned, scroll-scrubbed scenes need room; phones get simpler reveals. */
export const WIDE = '(min-width: 900px)';
