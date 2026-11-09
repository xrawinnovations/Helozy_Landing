'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

const stats = [
  { prefix: '', value: 300, decimals: 0, unit: 'kbps', label: 'Tested and working' },
  { prefix: '< ', value: 1, decimals: 0, unit: 's', label: 'To join on a slow connection' },
  { prefix: '', value: 0.57, decimals: 2, unit: 'GB', label: 'Per hour of recording' },
  { prefix: '', value: 0, decimals: 0, unit: 'apps', label: 'To install' },
];

/** Numbers from our own tests count up as they come into view. */
export function RealInternet() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        q('.stat__value').forEach((el) => {
          const to = Number(el.dataset.value);
          const decimals = Number(el.dataset.decimals);
          const n = { v: 0 };
          gsap.to(n, {
            v: to,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = n.v.toFixed(decimals);
            },
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });
        gsap.from(q('.signal i'), {
          scaleY: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: q('.signal')[0], start: 'top 80%' },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec">
      <span className="signal" aria-hidden>
        <i className="is-on" />
        <i />
        <i />
        <i />
      </span>
      <SectionHead
        eyebrow="Made for real-world Wi-Fi"
        title={
          <>
            Your best student might be <EndStop>learning</EndStop>{' '}
            <span className="hi">
              On one bar of <EndStop>signal</EndStop>
            </span>
          </>
        }
        lead="Not every student has fibre. Many join from a phone, on mobile data, from a room with one bar. So we tested HeloZy at 300 kbps. Students joined in under a second and stayed in class."
      />

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat" data-reveal>
            <strong>
              {s.prefix}
              <span className="stat__value" data-value={s.value} data-decimals={s.decimals}>
                {s.value.toFixed(s.decimals)}
              </span>
              <small>{s.unit}</small>
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <p className="stats__note" data-reveal>
        Students start with their camera off, and low-bandwidth mode keeps weak connections in the
        lesson.
      </p>
    </section>
  );
}
