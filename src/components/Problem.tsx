'use client';

import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP, WIDE } from '@/lib/gsap';
import { EndStop } from './EndStop';

const apps = [
  { name: 'Video call app', pain: 'cuts you off at 40 min' },
  { name: 'Whiteboard app', pain: 'another tab to juggle' },
  { name: 'WhatsApp groups', pain: 'links forwarded everywhere' },
  { name: 'Drive folders', pain: 'notes lost in folders' },
  { name: 'YouTube links', pain: 'hours of uploading' },
  { name: 'Attendance sheet', pain: 'ticking names by hand' },
];

const included = [
  'Live class',
  'Whiteboard on your tute',
  'Tutes and files',
  'Private recordings',
  'Reminders and attendance',
];

/** "Six apps → one link": the pills get crossed out and pulled into one HeloZy card. */
export function Problem() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const stage = q('.problem__stage')[0] as HTMLElement | undefined;

      // Curved wires from each pill to the card, measured from the real layout.
      const layoutWires = () => {
        if (!stage) return;
        const box = stage.getBoundingClientRect();
        const card = q('.hz-card')[0]?.getBoundingClientRect();
        if (!card) return;
        const endX = card.left - box.left;
        q('.app-pill').forEach((pill, i) => {
          const r = pill.getBoundingClientRect();
          const sx = r.right - box.left;
          const sy = r.top - box.top + r.height / 2;
          const ey = card.top - box.top + card.height * (0.3 + i * 0.08);
          const mid = sx + (endX - sx) * 0.55;
          q('.wire')[i]?.setAttribute(
            'd',
            `M ${sx} ${sy} C ${mid} ${sy}, ${mid} ${ey}, ${endX} ${ey}`,
          );
        });
        q('.wires')[0]?.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      };
      layoutWires();
      ScrollTrigger.addEventListener('refreshInit', layoutWires);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(q('.problem__title'), {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.05,
              ease: 'expo.out',
              scrollTrigger: { trigger: self.elements[0], start: 'top 85%' },
            }),
        });
        gsap.from(q('.problem__lead, .problem__head .eyebrow'), {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.problem__head')[0], start: 'top 80%' },
        });
      });

      // Wide screens: pin the scene and play it with the scroll.
      mm.add(`${MOTION_OK} and ${WIDE}`, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: stage,
            start: 'center center',
            end: '+=150%',
            pin: true,
            scrub: 1,
          },
        });
        gsap.set(q('.wire'), { strokeDashoffset: 1 });
        gsap.set(q('.app-pill__strike'), { scaleX: 0 });
        gsap.set(q('.hz-card'), {
          opacity: 0.25,
          scale: 0.92,
          filter: 'blur(6px)',
        });
        gsap.set(q('.hz-card__item'), { opacity: 0.2, x: 12 });
        gsap.set(q('.hz-card__cta, .problem__tag'), { opacity: 0, y: 16 });

        q('.app-pill').forEach((pill, i) => {
          const at = i * 0.5;
          tl.to(pill.querySelector('.app-pill__strike'), { scaleX: 1, duration: 0.5 }, at)
            .to(pill, { opacity: 0.4, x: 8, duration: 0.5 }, at + 0.2)
            .to(q('.wire')[i] ?? {}, { strokeDashoffset: 0, duration: 0.8 }, at + 0.25);
        });
        tl.to(q('.hz-card'), { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 }, 1.2)
          .to(q('.hz-card__item'), { opacity: 1, x: 0, duration: 0.5, stagger: 0.25 }, 2.2)
          .to(q('.hz-card__cta'), { opacity: 1, y: 0, duration: 0.6 }, '>-0.1')
          .to(q('.wires'), { opacity: 0.35, duration: 0.6 }, '<')
          .to(q('.problem__tag'), { opacity: 1, y: 0, duration: 0.8 }, '<0.2');
      });

      // Phones: simple reveals, no pinning.
      mm.add(`${MOTION_OK} and not ${WIDE}`, () => {
        q('.app-pill').forEach((pill) => {
          gsap.from(pill.querySelector('.app-pill__strike'), {
            scaleX: 0,
            duration: 0.6,
            scrollTrigger: { trigger: pill, start: 'top 75%' },
          });
        });
        gsap.from(q('.hz-card'), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.hz-card')[0], start: 'top 85%' },
        });
      });

      return () => ScrollTrigger.removeEventListener('refreshInit', layoutWires);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="problem" id="problem">
      <div className="problem__head">
        <span className="eyebrow">
          <i /> The problem
        </span>
        <h2 className="problem__title">
          You teach one <EndStop>class</EndStop>{' '}
          <span className="hi">
            On six different <EndStop>apps</EndStop>
          </span>
        </h2>
        <p className="problem__lead">
          Zoom for the class. A whiteboard app on the side. WhatsApp for tutes and reminders. Drive
          for notes. YouTube for recordings. A spreadsheet for attendance. And half the lesson goes
          on switching between them.
        </p>
      </div>

      <div className="problem__stage">
        <div className="problem__col">
          <span className="col-label">Today</span>
          <ul className="apps">
            {apps.map((app) => (
              <li key={app.name} className="app-pill">
                <span className="app-pill__x">
                  <X size={14} />
                </span>
                <span className="app-pill__text">
                  <span className="app-pill__name">
                    {app.name}
                    <i className="app-pill__strike" aria-hidden />
                  </span>
                  <small>{app.pain}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <svg className="wires" aria-hidden>
          {apps.map((app) => (
            <path key={app.name} className="wire" pathLength={1} />
          ))}
        </svg>

        <div className="problem__col problem__col--card">
          <span className="col-label col-label--lime">With HeloZy</span>
          <div className="hz-card">
            <div className="hz-card__top">
              <Image src="/helozy-icon-dark-bg.svg" alt="" width={30} height={30} />
              <span className="hz-card__brand">HeloZy</span>
              <span className="badge badge--live-dark">
                <i /> Live
              </span>
            </div>
            <h3 className="hz-card__title">Algebra Masterclass</h3>
            <p className="hz-card__meta">Mathematics · Weekly · Tue 7 pm</p>
            <ul className="hz-card__list">
              {included.map((item) => (
                <li key={item} className="hz-card__item">
                  <span className="hz-card__tick">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <span className="hz-card__cta">One link. Everything.</span>
          </div>
        </div>
      </div>

      <p className="problem__tag">
        Your whole <EndStop>class</EndStop>{' '}
        <span className="hi">
          One <EndStop>link</EndStop>
        </span>
      </p>
    </section>
  );
}
