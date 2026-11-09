'use client';

import {
  Hand,
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  PenLine,
  Presentation,
  Video,
} from 'lucide-react';
import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';

/* Graph of y = x² − 5x + 6 on the board (SVG units). */
const ORIGIN = { x: 470, y: 330 };
const UNIT = { x: 46, y: 40 };
const toBoard = (x: number, y: number) =>
  `${(ORIGIN.x + x * UNIT.x).toFixed(1)} ${(ORIGIN.y - y * UNIT.y).toFixed(1)}`;
const PARABOLA =
  'M ' +
  Array.from({ length: 39 }, (_, i) => {
    const x = 0.6 + i * 0.1;
    return toBoard(x, x * x - 5 * x + 6);
  }).join(' L ');

/** Steps of working, written one after another (each is revealed left to right). */
const STEPS = [
  { id: 'q', y: 62, width: 330 },
  { id: 's1', y: 132, width: 250 },
  { id: 's2', y: 194, width: 330 },
  { id: 'ans', y: 262, width: 230 },
];

const students = [
  { initials: 'KV', name: 'Kavin', tint: 'var(--tint-sky)', hand: true },
  { initials: 'AM', name: 'Amaya', tint: 'var(--tint-peach)' },
  { initials: 'IS', name: 'Ishan', tint: 'var(--tint-mint)' },
  { initials: 'SR', name: 'Sara', tint: 'var(--tint-rose)' },
];

/** The live classroom with the whiteboard open: drawn in code so every part can animate. */
export function HeroMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.set(q('.wipe'), { attr: { width: 0 } });
        gsap.set(q('.draw'), { strokeDashoffset: 1 });
        gsap.set(q('.root-dot, .hand-badge, .sticky'), {
          scale: 0,
          transformOrigin: '50% 50%',
        });

        const cursor = q('.board-cursor')[0];
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
          defaults: { ease: 'power1.inOut' },
          delay: 0.6,
        });

        STEPS.forEach((step, i) => {
          tl.to(
            cursor ?? {},
            { x: 36, y: step.y - 6, duration: 0.35, ease: 'power2.inOut' },
            i ? '+=0.15' : 0,
          );
          tl.to(q(`#wipe-${step.id}`), { attr: { width: step.width }, duration: 0.9 }, '<');
          tl.to(cursor ?? {}, { x: 36 + step.width, duration: 0.9 }, '<');
          if (step.id === 's1')
            tl.to(q('.hand-badge'), { scale: 1, duration: 0.5, ease: 'back.out(2)' }, '<0.3');
        });
        tl.to(q('.hl'), { strokeDashoffset: 0, duration: 0.6 })
          .to(q('.loop'), { strokeDashoffset: 0, duration: 0.8 }, '<0.2')
          .to(cursor ?? {}, {
            x: 600,
            y: 120,
            duration: 0.6,
            ease: 'power2.inOut',
          })
          .to(q('.axes'), { strokeDashoffset: 0, duration: 0.6 }, '<')
          .to(q('.curve'), { strokeDashoffset: 0, duration: 1.4 })
          .to(q('.root-dot'), {
            scale: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'back.out(3)',
          })
          .to(q('.sticky'), { scale: 1, duration: 0.6, ease: 'back.out(1.8)' }, '<0.1')
          .to(cursor ?? {}, { x: 690, y: 40, opacity: 0, duration: 0.6 });

        gsap.to(q('.speaking'), {
          scale: 1.08,
          opacity: 0.35,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mock">
      <div className="mock__bar">
        <span className="mock__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="mock__url">app.helozy.com/live/algebra-masterclass</span>
        <span className="mock__badges">
          <span className="badge badge--live">
            <i /> Live · 42:18
          </span>
          <span className="badge badge--rec">
            <i /> REC
          </span>
        </span>
      </div>

      <div className="room">
        <div className="board">
          <div className="board__top">
            <span className="board__title">Algebra Masterclass · Page 3 of 8</span>
            <span className="board__pens" aria-hidden>
              <i style={{ background: 'var(--board-pen-black)' }} />
              <i style={{ background: 'var(--board-pen-blue)' }} className="is-on" />
              <i style={{ background: 'var(--board-pen-red)' }} />
              <i style={{ background: 'var(--board-pen-green)' }} />
              <i style={{ background: 'var(--board-pen-purple)' }} />
            </span>
          </div>
          <div className="board__paper">
            <svg
              viewBox="0 0 720 400"
              className="board__svg"
              role="img"
              aria-label="A maths question being solved on the whiteboard"
            >
              <defs>
                {STEPS.map((s) => (
                  <clipPath key={s.id} id={`clip-${s.id}`}>
                    <rect
                      id={`wipe-${s.id}`}
                      className="wipe"
                      x="30"
                      y={s.y - 40}
                      width={s.width + 20}
                      height="56"
                    />
                  </clipPath>
                ))}
              </defs>

              <path className="draw hl" pathLength={1} d="M 34 254 Q 150 246 262 252" />
              <path
                className="draw loop"
                pathLength={1}
                d="M 26 262 C 20 222, 262 214, 270 250 C 276 286, 50 292, 30 258"
              />

              <g clipPath="url(#clip-q)">
                <text x="36" y="62" className="t t--ink">
                  <tspan className="t--label">Q3.</tspan> Solve x² − 5x + 6 = 0
                </text>
              </g>
              <g clipPath="url(#clip-s1)">
                <text x="36" y="132" className="t t--blue">
                  (x − 2)(x − 3) = 0
                </text>
              </g>
              <g clipPath="url(#clip-s2)">
                <text x="36" y="194" className="t t--blue">
                  x − 2 = 0 or x − 3 = 0
                </text>
              </g>
              <g clipPath="url(#clip-ans)">
                <text x="36" y="262" className="t t--ink t--bold">
                  x = 2 or x = 3
                </text>
              </g>

              <path
                className="draw axes"
                pathLength={1}
                d={`M 450 ${ORIGIN.y} H 704 M ${ORIGIN.x} 350 V 76`}
              />
              {[1, 2, 3, 4].map((n) => (
                <text key={n} x={ORIGIN.x + n * UNIT.x} y={ORIGIN.y + 22} className="t t--tick">
                  {n}
                </text>
              ))}
              <path className="draw curve" pathLength={1} d={PARABOLA} />
              <circle className="root-dot" cx={ORIGIN.x + 2 * UNIT.x} cy={ORIGIN.y} r="7" />
              <circle className="root-dot" cx={ORIGIN.x + 3 * UNIT.x} cy={ORIGIN.y} r="7" />
              <text x="560" y="104" className="t t--purple">
                y = x² − 5x + 6
              </text>

              <g className="board-cursor" transform="translate(36 56)">
                <path
                  d="M0 0 L0 18 L5 13 L9 22 L12 21 L8 12 L15 12 Z"
                  className="board-cursor__arrow"
                />
                <rect x="14" y="20" width="76" height="22" rx="11" className="board-cursor__tag" />
                <text x="52" y="35" className="board-cursor__name">
                  Ms. Nadia
                </text>
              </g>
            </svg>
            <div className="sticky">Exam tip: put both answers back in to check ✓</div>
          </div>
          <div className="board__tools" aria-hidden>
            <PenLine size={16} />
            <span className="board__tool-sep" />
            <span>Graph paper</span>
            <span>∑ Equation</span>
            <span>PDF</span>
          </div>
        </div>

        <aside className="tiles">
          <div className="tile tile--teacher">
            <span className="speaking" aria-hidden />
            <span className="avatar avatar--teacher">NP</span>
            <span className="tile__name">
              <Mic size={12} /> Ms. Nadia · Teacher
            </span>
          </div>
          <div className="tiles__grid">
            {students.map((s) => (
              <div key={s.name} className="tile">
                {s.hand && (
                  <span className="hand-badge" aria-label="Hand raised">
                    <Hand size={12} />
                  </span>
                )}
                <span className="avatar" style={{ background: s.tint }}>
                  {s.initials}
                </span>
                <span className="tile__name">
                  <MicOff size={11} /> {s.name}
                </span>
              </div>
            ))}
          </div>
          <div className="tile tile--more">+20 students</div>
        </aside>
      </div>

      <div className="room__controls" aria-hidden>
        <span className="ctl">
          <Mic size={16} />
        </span>
        <span className="ctl">
          <Video size={16} />
        </span>
        <span className="ctl">
          <MonitorUp size={16} />
        </span>
        <span className="ctl ctl--on">
          <Presentation size={16} /> Whiteboard
        </span>
        <span className="ctl ctl--rec">
          <i /> Recording
        </span>
        <span className="ctl">
          <Hand size={16} />
        </span>
        <span className="ctl">
          <MessageSquare size={16} />
        </span>
        <span className="ctl ctl--leave">
          <LogOut size={16} /> End
        </span>
      </div>
    </div>
  );
}
