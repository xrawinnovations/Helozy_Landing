'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { links } from '@/lib/links';
import { EndStop } from './EndStop';
import { MagneticLink } from './MagneticLink';

/** Closing call to action over the logo's orbit, which turns slowly behind the headline. */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.to(q('.orbit__spin'), { rotate: 360, duration: 24, repeat: -1, ease: 'none' });
        gsap.from(q('.orbit'), {
          scale: 0.6,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'center center', scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="final">
      <div className="orbit" aria-hidden>
        <span className="orbit__ring" />
        <span className="orbit__spin">
          <i className="orbit__dot" />
        </span>
      </div>
      <h2 className="sec__title final__title">
        Your next class could be{' '}
        <span className="hi">
          one link <EndStop>away</EndStop>
        </span>
      </h2>
      <p className="sec__lead" data-reveal>
        Teach your next lesson on HeloZy.
      </p>
      <div className="final__cta" data-reveal>
        <MagneticLink href={links.getStarted} className="btn btn--lime">
          Get started <span aria-hidden>→</span>
        </MagneticLink>
      </div>
    </section>
  );
}
