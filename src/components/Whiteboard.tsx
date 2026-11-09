'use client';

import {
  Download,
  FileText,
  Grid3x3,
  Highlighter,
  PenLine,
  Shapes,
  Sigma,
  Type,
} from 'lucide-react';
import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP, WIDE } from '@/lib/gsap';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

const steps = [
  { title: 'Bring your tute', text: 'PDFs and images, one page per board page.' },
  {
    title: 'Write like it’s paper',
    text: 'Pressure-sensitive pen, highlighter, shapes, arrows and sticky notes.',
  },
  { title: 'Type clean equations', text: 'A proper equation editor for maths and science.' },
  { title: 'Pick your paper', text: 'Lined, grid, graph, dots, isometric or chalkboard.' },
  {
    title: 'Hand over the pen',
    text: 'Let a student solve it on the board, then take it back.',
  },
  { title: 'Share the board', text: 'Export it as a PDF for your class.' },
];

/** A past paper on the board; each step of the list plays one part of the working out. */
export function Whiteboard() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const build = () => {
        const q = gsap.utils.selector(ref);
        const step = q('.wb-step');
        const on = (i: number) => [
          gsap.fromTo(step[i] ?? {}, { opacity: 0.35 }, { opacity: 1, duration: 0.4 }),
          gsap.fromTo(
            step[i]?.querySelector('.wb-step__bar') ?? {},
            { scaleY: 0 },
            { scaleY: 1, duration: 0.6 },
          ),
        ];
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, paused: true });
        tl.add(on(0), 0)
          .from(q('.wb-board'), { y: 50, opacity: 0, duration: 0.8 }, 0)
          .from(q('.wb-file'), { y: 12, opacity: 0, duration: 0.5 }, 0.3)
          .add(on(1), 1)
          .from(q('.wb-mark--hl path'), { strokeDashoffset: 1, duration: 0.6 }, 1.1)
          .from(q('.wb-mark--circle path'), { strokeDashoffset: 1, duration: 0.7 }, 1.5)
          .add(on(2), 2.3)
          .from(q('.wb-eq'), { scale: 0.85, opacity: 0, duration: 0.6 }, 2.4)
          .add(on(3), 3.2)
          .from(q('.wb-grid'), { opacity: 0, duration: 0.6 }, 3.3)
          .from(q('.wb-paper-chip'), { y: 10, opacity: 0, duration: 0.4 }, 3.3)
          .add(on(4), 4.1)
          .from(q('.wb-cursor'), { x: 80, y: 40, opacity: 0, duration: 0.6 }, 4.2)
          .fromTo(
            q('.wb-hand'),
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'none' },
            4.6,
          )
          .from(q('.wb-mark--box path'), { strokeDashoffset: 1, duration: 0.5 }, 5.5)
          .add(on(5), 6.1)
          .from(q('.wb-toast'), { y: 20, opacity: 0, duration: 0.6 }, 6.2);
        return tl;
      };

      // Wide screens: pin the board and play the steps with the scroll.
      mm.add(`${MOTION_OK} and ${WIDE}`, () => {
        const tl = build();
        gsap.to(tl, {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current?.querySelector('.wb'),
            start: 'center center',
            end: '+=180%',
            pin: true,
            scrub: 1,
          },
        });
      });
      // Phones: play once when the board comes into view.
      mm.add(`${MOTION_OK} and not ${WIDE}`, () => {
        const tl = build();
        gsap.to(tl, {
          progress: 1,
          duration: 7,
          ease: 'none',
          scrollTrigger: { trigger: ref.current?.querySelector('.wb-board'), start: 'top 75%' },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec" id="whiteboard">
      <SectionHead
        eyebrow="The STEM whiteboard"
        title={
          <>
            Sharing your screen isn&rsquo;t <EndStop>teaching</EndStop>{' '}
            <span className="hi">
              Writing on the paper <EndStop>is</EndStop>
            </span>
          </>
        }
        lead="Circle the key word. Underline the trap in Q3. Work the answer out right there on the paper, the way you would in front of a real class."
      />

      <div className="wb">
        <ol className="wb-steps">
          {steps.map((s, i) => (
            <li key={s.title} className="wb-step">
              <i className="wb-step__bar" aria-hidden />
              <span className="wb-step__num">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </span>
            </li>
          ))}
          <li className="wb-devices">
            Works with a mouse, a drawing tablet, an iPad with Apple Pencil or an Android stylus.
          </li>
        </ol>

        <div className="wb-stage" aria-hidden>
          <div className="wb-top">
            <span className="wb-file">
              <FileText size={14} /> past-paper-2025.pdf · Page 4 of 12
            </span>
            <span className="wb-paper-chip">
              <Grid3x3 size={14} /> Graph paper
            </span>
          </div>

          <div className="wb-board">
            <div className="wb-grid" />
            <p className="wb-q">
              <b>5.</b> The curve C has equation y = x³ − 3x.
            </p>
            <p className="wb-q">(a) Find dy/dx.</p>
            <p className="wb-q">
              (b) Find the{' '}
              <span className="wb-mark wb-mark--hl">
                gradient
                <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path pathLength={1} d="M 2 12 L 98 11" />
                </svg>
              </span>{' '}
              of C at the point where{' '}
              <span className="wb-mark wb-mark--circle">
                x = 2
                <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path
                    pathLength={1}
                    d="M 60 4 C 92 4, 99 22, 96 32 C 92 46, 20 48, 6 36 C -4 26, 8 6, 52 3"
                  />
                </svg>
              </span>
              .
            </p>

            <div className="wb-eq">
              <i>dy</i>⁄<i>dx</i> = 3<i>x</i>² − 3
            </div>

            <p className="wb-hand">
              At x = 2: 3(2)² − 3 ={' '}
              <span className="wb-mark wb-mark--box">
                9
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path pathLength={1} d="M 4 6 L 96 4 L 95 95 L 5 96 Z" />
                </svg>
              </span>
            </p>

            <span className="wb-cursor">
              <PenLine size={16} />
              <em>Kavin</em>
            </span>

            <div className="wb-tools">
              <PenLine size={16} />
              <Highlighter size={16} />
              <Shapes size={16} />
              <Type size={16} />
              <Sigma size={16} />
            </div>
          </div>

          <span className="wb-toast">
            <Download size={15} /> Q5 working.pdf · <strong>Shared with class</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
