'use client';

import { Check } from 'lucide-react';
import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

const rows = [
  ['Class cut off at minute 40', 'Teach until the lesson is done'],
  ['Pointing at a PDF with the mouse', 'Writing on your tute, live'],
  ['Two hours uploading recordings', 'One click to record, one to share'],
  ['Typing the same reminder three times', 'Reminders send themselves'],
  ['40 paid, 55 joined', 'Only your students get in'],
  ['Ticking names in a spreadsheet', 'Attendance takes itself'],
  ['Six apps', 'One link'],
];

/** Each "today" gets crossed out and its HeloZy answer lights up as the row scrolls past. */
export function BeforeAfter() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        q('.ba__row').forEach((row) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: row, start: 'top 80%', end: 'top 55%', scrub: 1 },
            })
            .from(row.querySelector('.ba__strike'), { scaleX: 0, ease: 'none' })
            .from(row.querySelector('.ba__now'), { opacity: 0.6, ease: 'none' }, 0)
            .from(row.querySelector('.ba__after'), { opacity: 0.15, x: -16, ease: 'none' }, 0.3);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec">
      <SectionHead
        eyebrow="Before and after"
        title={
          <>
            Your <EndStop>week</EndStop>{' '}
            <span className="hi">
              Before and after <EndStop>HeloZy</EndStop>
            </span>
          </>
        }
      />
      <div className="ba" role="table" aria-label="Your week before and after HeloZy">
        <div className="ba__head" role="row">
          <span role="columnheader">Today</span>
          <span role="columnheader">With HeloZy</span>
        </div>
        {rows.map(([now, after]) => (
          <div key={now} className="ba__row" role="row">
            <span className="ba__now" role="cell">
              <span className="ba__text">
                {now}
                <i className="ba__strike" aria-hidden />
              </span>
            </span>
            <span className="ba__after" role="cell">
              <Check size={18} /> {after}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
