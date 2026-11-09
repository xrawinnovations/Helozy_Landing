'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { links } from '@/lib/links';
import { show } from '@/lib/sections';
import { MagneticLink } from './MagneticLink';

const items = [
  { href: '#features', label: 'Features' },
  { href: '#whiteboard', label: 'Whiteboard', on: show.whiteboard },
  { href: '#recordings', label: 'Recordings' },
  { href: '#how', label: 'How it works' },
  { href: '#safety', label: 'Safety', on: show.safety },
  { href: '#faq', label: 'FAQ', on: show.faq },
].filter((item) => item.on !== false);

/** Floating glass pill. Turns solid after a little scroll; hides while scrolling down. */
export function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        el.classList.toggle('nav--scrolled', y > 80);
        el.classList.toggle('nav--hidden', self.direction === 1 && y > 700);
      },
    });
    gsap.matchMedia().add(MOTION_OK, () => {
      // The pill, not the header: the header's own transform is the hide-on-scroll.
      gsap.from(el.firstElementChild, {
        yPercent: -120,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
      });
    });
  });

  return (
    <header ref={ref} className="nav">
      <nav className="nav__pill" aria-label="Main">
        <a href="#top" className="nav__logo">
          <Image src="/helozy-logo-dark-bg.svg" alt="HeloZy" width={116} height={32} priority />
        </a>
        <ul className="nav__links">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav__actions">
          <a className="nav__signin" href={links.signIn}>
            Sign in
          </a>
          <MagneticLink href={links.getStarted} className="btn btn--lime btn--sm">
            Get started
          </MagneticLink>
        </div>
      </nav>
    </header>
  );
}
