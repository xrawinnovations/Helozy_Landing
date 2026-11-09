'use client';

import { Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';

const views = {
  tutors: {
    label: 'For tutors',
    title: 'Spend your evenings teaching, not managing apps.',
    text: 'Your classes, board, files, timetable and attendance, all on one dashboard.',
    list: [
      'Every class and its link in one place',
      'Your weekly timetable, set once',
      'Recordings, boards and files per lesson',
      'Attendance for every class',
    ],
  },
  students: {
    label: 'For students',
    title: 'One link for everything.',
    text: 'Join the live class, rewatch lessons, download notes and see what’s next.',
    list: [
      'Join in the browser, no app to install',
      'Rewatch from 0.5× to 2×, pick up where you stopped',
      'Notes and worksheets with each lesson',
      'The next class in your own time zone',
    ],
  },
};
type View = keyof typeof views;

/** A switch between the tutor's and the student's side of HeloZy. */
export function Audience() {
  const ref = useRef<HTMLElement>(null);
  const [view, setView] = useState<View>('tutors');
  const current = views[view];

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(gsap.utils.selector(ref)('.aud__panel > *'), {
          y: 16,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
        });
      });
    },
    { scope: ref, dependencies: [view], revertOnUpdate: true },
  );

  return (
    <section ref={ref} className="sec sec--tight">
      <div className="aud" data-reveal>
        <div className="aud__switch" role="tablist" aria-label="Who is it for">
          <i className={`aud__thumb aud__thumb--${view}`} aria-hidden />
          {(Object.keys(views) as View[]).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
            >
              {views[v].label}
            </button>
          ))}
        </div>
        <div className="aud__panel" role="tabpanel">
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <ul>
            {current.list.map((item) => (
              <li key={item}>
                <Check size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
