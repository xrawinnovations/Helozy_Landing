'use client';

import {
  FileText,
  Gauge,
  Lock,
  Pause,
  PenLine,
  Presentation,
  RotateCcw,
  RotateCw,
  Users,
  Video,
} from 'lucide-react';
import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { links } from '@/lib/links';
import { EndStop } from './EndStop';
import { MagneticLink } from './MagneticLink';
import { SectionHead } from './SectionHead';

const points = [
  { icon: Video, title: 'One click to record' },
  { icon: Presentation, title: 'Your board and you, side by side' },
  { icon: Lock, title: 'Private until you share it' },
  { icon: Gauge, title: 'Rewatch at 0.5× to 2×' },
  { icon: RotateCcw, title: 'Pick up where you stopped' },
];

const lessons = [
  { date: 'Tue 4 Nov', title: 'Quadratics: past paper Q3' },
  { date: 'Tue 28 Oct', title: 'Factorising, part 2' },
  { date: 'Tue 21 Oct', title: 'Factorising, part 1' },
];

/** The player plays to where the student stopped, then the recording is shared with the class. */
export function Recordings() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: q('.player')[0], start: 'top 70%' },
          })
          .from(q('.player'), { y: 60, opacity: 0, scale: 0.96, duration: 1.1 })
          .from(q('.player__fill'), { scaleX: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
          .from(q('.player__resume'), { y: 8, opacity: 0, duration: 0.5 }, 2.1)
          .fromTo(
            q('.share__private'),
            { y: 0, opacity: 1 },
            { y: -14, opacity: 0, duration: 0.4 },
            2.6,
          )
          .fromTo(
            q('.share__shared'),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            2.75,
          )
          .from(q('.lesson'), { x: -20, opacity: 0, duration: 0.6, stagger: 0.12 }, 2.9);
        gsap.to(q('.player__live'), {
          opacity: 0.3,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec sec--glow" id="recordings">
      <SectionHead
        eyebrow="Class recordings"
        title={
          <>
            Missed class? Exam next <EndStop>week</EndStop>{' '}
            <span className="hi">
              It&rsquo;s all <EndStop>recorded</EndStop>
            </span>
          </>
        }
        lead="Press Record once. When class ends, the recording is waiting on the class page."
      />

      <div className="rec">
        <div className="rec__media" aria-hidden>
          <div className="player">
            <div className="player__screen">
              <div className="player__board">
                <p className="paper__q">
                  <b>Q3.</b> Solve x² − 5x + 6 = 0
                </p>
                <p className="paper__hand">(x − 2)(x − 3) = 0</p>
                <p className="paper__hand paper__hand--hl">x = 2 or x = 3</p>
              </div>
              <div className="player__cam">
                <span className="avatar avatar--teacher">NP</span>
                <span>Ms. Nadia</span>
              </div>
              <span className="player__title">
                <i className="player__live" /> Algebra Masterclass · Tue 4 Nov
              </span>
            </div>
            <div className="player__controls">
              <Pause size={18} />
              <RotateCcw size={16} />
              <RotateCw size={16} />
              <span className="player__track">
                <i className="player__fill" />
                <span className="player__resume">You stopped here</span>
              </span>
              <span className="player__time">36:10 / 58:00</span>
              <span className="speeds">
                {['0.5×', '1×', '1.5×', '2×'].map((s) => (
                  <em key={s} className={s === '1.5×' ? 'is-on' : undefined}>
                    {s}
                  </em>
                ))}
              </span>
            </div>
          </div>

          <div className="share">
            <span className="share__private">
              <Lock size={14} /> Private · only you can see it
            </span>
            <span className="share__shared">
              <Users size={14} /> Shared with class · 24 students emailed
            </span>
          </div>

          <ul className="lessons">
            {lessons.map((l) => (
              <li key={l.date} className="lesson">
                <span className="lesson__date">{l.date}</span>
                <strong>{l.title}</strong>
                <span className="lesson__chips">
                  <em>
                    <Video size={12} /> Recording
                  </em>
                  <em>
                    <PenLine size={12} /> Board
                  </em>
                  <em>
                    <FileText size={12} /> Worksheet
                  </em>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rec__copy">
          <ul className="points">
            {points.map(({ icon: Icon, title }) => (
              <li key={title} data-reveal>
                <span className="points__icon">
                  <Icon size={20} />
                </span>
                {title}
              </li>
            ))}
          </ul>
          <div data-reveal>
            <MagneticLink href={links.getStarted} className="btn btn--lime">
              Get started <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
