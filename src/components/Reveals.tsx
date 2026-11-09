'use client';

import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';

/**
 * Page-wide scroll reveals, mounted once after every section: section headlines rise word by
 * word, and anything marked data-reveal fades up as it enters the screen.
 */
export function Reveals() {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>('.sec__title').forEach((el) => {
        SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.05,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            }),
        });
      });

      gsap.set('[data-reveal]', { y: 40, opacity: 0 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out' }),
      });
      ScrollTrigger.refresh();
    });
  });

  return null;
}
