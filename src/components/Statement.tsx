'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, SplitText, useGSAP } from '@/lib/gsap';
import { EndStop } from './EndStop';

/** Big statement whose words come into focus out of a blur as you scroll. */
export function Statement() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        SplitText.create(q('.statement__text'), {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.12, filter: 'blur(10px)', y: 12 },
              {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                stagger: 0.12,
                ease: 'none',
                scrollTrigger: {
                  trigger: ref.current,
                  start: 'top 75%',
                  end: 'center 45%',
                  scrub: 1,
                },
              },
            ),
        });
        gsap.fromTo(
          q('.statement__glow'),
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="statement">
      <div className="statement__glow" aria-hidden />
      <p className="statement__text">
        Meeting apps were built for <EndStop>meetings</EndStop>{' '}
        <span className="hi statement__line">
          HeloZy is built for <EndStop>lessons</EndStop>
        </span>
      </p>
    </section>
  );
}
