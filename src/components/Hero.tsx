'use client';

import { BellRing, Hand, Lock, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP, WIDE } from '@/lib/gsap';
import { links } from '@/lib/links';
import { EndStop } from './EndStop';
import { HeroMockup } from './HeroMockup';
import { MagneticLink } from './MagneticLink';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.25 });

        intro
          .from(q('.spot__grid, .spot__glow'), { opacity: 0, duration: 2 }, 0)
          .from(
            q('.app-tile-wrap'),
            { y: -30, scale: 0.6, rotate: -12, opacity: 0, duration: 1.2, ease: 'back.out(1.8)' },
            0.15,
          )
          .from(q('.hero__fade'), { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.3)
          .from(q('.hero__stage'), { y: 140, opacity: 0, duration: 1.6 }, 0.7)
          .from(
            q('.float'),
            { scale: 0.6, opacity: 0, duration: 1, stagger: 0.12, ease: 'back.out(1.6)' },
            1.2,
          );

        // Its own tween (not part of the intro): the split can happen again after fonts load.
        SplitText.create(q('.hero__title'), {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.07,
              ease: 'expo.out',
              delay: 0.4,
            }),
        });

        // The app tile bobs gently.
        gsap.to(q('.app-tile'), {
          y: -8,
          rotate: -2,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // The classroom lies back in 3D, then lands flat as you scroll to it.
        gsap.fromTo(
          q('.mock'),
          { rotateX: 26, scale: 0.9, y: 0 },
          {
            rotateX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: q('.hero__stage')[0],
              start: 'top 90%',
              end: 'top 12%',
              scrub: 1,
            },
          },
        );

        // Cards drift at different speeds (parallax) and bob gently on their own.
        q('.float').forEach((card) => {
          const speed = Number(card.dataset.speed ?? 1);
          gsap.to(card, {
            y: -140 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: q('.hero__stage')[0],
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
          gsap.to(card.firstElementChild, {
            y: 10,
            rotate: speed > 1 ? 1.5 : -1.5,
            duration: 2.4 + speed,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
        ScrollTrigger.refresh();
      });

      // Spotlight: the glow follows the pointer on desktop and wanders slowly elsewhere.
      gsap.matchMedia().add(
        {
          pointer: `${MOTION_OK} and ${WIDE} and (pointer: fine)`,
          idle: `${MOTION_OK} and not (${WIDE} and (pointer: fine))`,
        },
        (ctx) => {
          const spot = gsap.utils.selector(ref)('.spot')[0] as HTMLElement | undefined;
          if (!spot) return;
          const pos = { x: 50, y: 42 };
          const apply = () => {
            spot.style.setProperty('--mx', `${pos.x}%`);
            spot.style.setProperty('--my', `${pos.y}%`);
          };
          if (!ctx.conditions?.pointer) {
            gsap
              .timeline({ repeat: -1, yoyo: true, defaults: { duration: 4, ease: 'sine.inOut' } })
              .to(pos, { x: 30, y: 34, onUpdate: apply })
              .to(pos, { x: 70, y: 50, onUpdate: apply });
            return;
          }
          const toX = gsap.quickTo(pos, 'x', {
            duration: 0.9,
            ease: 'power3.out',
            onUpdate: apply,
          });
          const toY = gsap.quickTo(pos, 'y', {
            duration: 0.9,
            ease: 'power3.out',
            onUpdate: apply,
          });
          const move = (e: PointerEvent) => {
            const r = spot.getBoundingClientRect();
            toX(((e.clientX - r.left) / r.width) * 100);
            toY(((e.clientY - r.top) / r.height) * 100);
          };
          spot.addEventListener('pointermove', move);
          return () => spot.removeEventListener('pointermove', move);
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero" id="top">
      <div className="spot">
        <div className="spot__grid" aria-hidden />
        <div className="spot__glow" aria-hidden />
        <div className="hero__copy">
          <span className="app-tile-wrap" aria-hidden>
            <span className="app-tile">
              <Image src="/helozy-icon-dark-bg.svg" alt="" width={56} height={56} priority />
            </span>
          </span>
          <span className="eyebrow hero__fade">
            <i /> The online classroom for tutors
          </span>
          <h1 className="hero__title">
            Your whole <EndStop>class</EndStop>{' '}
            <span className="hi">
              One <EndStop>link</EndStop>
            </span>
          </h1>
          <div className="hero__ctas hero__fade">
            <MagneticLink href={links.getStarted} className="btn btn--lime">
              Get started <span aria-hidden>→</span>
            </MagneticLink>
            <a href="#how" className="btn btn--ghost">
              See how it works
            </a>
          </div>
        </div>
      </div>

      <div className="hero__stage">
        <div className="hero__glow" aria-hidden />
        <HeroMockup />

        <div className="float float--reminder" data-speed="1.4">
          <div className="fcard">
            <span className="fcard__icon fcard__icon--lavender">
              <BellRing size={18} />
            </span>
            <div>
              <strong>Reminder sent</strong>
              <span>Algebra Masterclass in 1 hour</span>
              <span className="fcard__chips">
                <em>Email</em>
                <em>Push</em>
                <em>WhatsApp</em>
              </span>
            </div>
          </div>
        </div>

        <div className="float float--recording" data-speed="0.8">
          <div className="fcard">
            <span className="fcard__icon fcard__icon--rec">
              <Lock size={16} />
            </span>
            <div>
              <strong>Recording saved</strong>
              <span>Private until you share it</span>
            </div>
          </div>
        </div>

        <div className="float float--attendance" data-speed="1.1">
          <div className="fcard fcard--stat">
            <span className="fcard__kicker">Attendance · today</span>
            <strong className="fcard__big">24 joined</strong>
            <span>Average stay 58 min</span>
            <span className="bars" aria-hidden>
              {[60, 85, 70, 95, 80, 100, 90].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </span>
          </div>
        </div>

        <div className="float float--hand" data-speed="1.7">
          <div className="fcard fcard--pill">
            <span className="fcard__icon fcard__icon--lime">
              <Hand size={15} />
            </span>
            <strong>Kavin raised a hand</strong>
          </div>
        </div>

        <div className="float float--bandwidth" data-speed="0.6">
          <div className="fcard fcard--pill fcard--dark">
            <Wifi size={15} />
            <span>Low-bandwidth mode on</span>
          </div>
        </div>
      </div>
    </section>
  );
}
