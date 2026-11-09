'use client';

import { Bell, Check, ClipboardCheck, Link2, UserCheck, Video } from 'lucide-react';
import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

/** Three steps joined by a lime line that fills as you scroll past them. */
export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.from(q('.how__fill'), {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: { trigger: q('.how')[0], start: 'top 75%', end: 'bottom 55%', scrub: 1 },
        });
        q('.how__step').forEach((step) => {
          gsap.from(step.querySelectorAll('.how__tick'), {
            scale: 0,
            duration: 0.5,
            stagger: 0.25,
            ease: 'back.out(2.4)',
            scrollTrigger: { trigger: step, start: 'top 70%' },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="sec" id="how">
      <SectionHead
        eyebrow="Set up in minutes"
        title={
          <>
            From sign-up to your first <EndStop>class</EndStop>{' '}
            <span className="hi">
              In three <EndStop>steps</EndStop>
            </span>
          </>
        }
      />

      <div className="how">
        <span className="how__line" aria-hidden>
          <i className="how__fill" />
        </span>

        <article className="how__step" data-reveal>
          <span className="how__num">1</span>
          <h3>Create your class</h3>
          <p>Name, subject, colour and weekly timetable. Done once.</p>
          <div className="mini mini--form" aria-hidden>
            <span className="field">Algebra Masterclass</span>
            <span className="form__row">
              <em className="chip chip--lavender">Mathematics</em>
              <span className="swatches">
                <i style={{ background: 'var(--primary)' }} />
                <i style={{ background: 'var(--accent)' }} />
                <i style={{ background: 'var(--tint-sky)' }} />
                <i style={{ background: 'var(--tint-peach)' }} />
              </span>
            </span>
            <span className="field field--soft">Every Tuesday · 7:00 pm</span>
          </div>
        </article>

        <article className="how__step" data-reveal>
          <span className="how__num">2</span>
          <h3>Share one link</h3>
          <p>
            Drop it in your WhatsApp group. Students tap it and join in the browser. You approve who
            gets in.
          </p>
          <div className="mini mini--chat" aria-hidden>
            <span className="bubble">
              Class tonight at 7 👇
              <span className="bubble__link">
                <Link2 size={13} /> app.helozy.com/j/algebra
              </span>
            </span>
            <span className="approve">
              <UserCheck size={14} /> Kavin wants to join
              <em className="mini__btn mini__btn--lime">
                <Check size={12} className="how__tick" /> Admit
              </em>
            </span>
          </div>
        </article>

        <article className="how__step" data-reveal>
          <span className="how__num">3</span>
          <h3>Teach. HeloZy does the rest</h3>
          <p>
            Reminders go out, attendance takes itself, and the recording waits for you to share it.
          </p>
          <div className="mini mini--done" aria-hidden>
            {[
              { icon: <Bell size={14} />, text: 'Reminders sent' },
              { icon: <ClipboardCheck size={14} />, text: 'Attendance saved' },
              { icon: <Video size={14} />, text: 'Recording ready' },
            ].map((r) => (
              <span key={r.text} className="done">
                {r.icon}
                {r.text}
                <i className="how__tick">
                  <Check size={12} />
                </i>
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
