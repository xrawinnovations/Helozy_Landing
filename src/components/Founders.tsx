import { Star } from 'lucide-react';
import { links } from '@/lib/links';
import { EndStop } from './EndStop';
import { MagneticLink } from './MagneticLink';

const perks = [
  'Free during the beta',
  'A founding-tutor price for life after launch',
  'A personal onboarding call',
  'A direct line to the team',
];

export function Founders() {
  return (
    <section className="sec sec--tight" id="founders">
      <div className="founders" data-reveal>
        <span className="founders__ring" aria-hidden />
        <span className="eyebrow">
          <i /> Free beta
        </span>
        <h2 className="sec__title">
          We&rsquo;re looking for{' '}
          <span className="hi">
            10 founding <EndStop>tutors</EndStop>
          </span>
        </h2>
        <p className="sec__lead">
          Teach real classes on HeloZy, tell us what&rsquo;s missing, and help shape what we build
          next.
        </p>
        <ul className="perks">
          {perks.map((p) => (
            <li key={p}>
              <Star size={16} /> {p}
            </li>
          ))}
        </ul>
        <MagneticLink href={links.getStarted} className="btn btn--lime">
          Become a founding tutor <span aria-hidden>→</span>
        </MagneticLink>
        <p className="founders__small">
          Any subject. Sri Lanka, the UK, or anywhere you teach online.
        </p>
      </div>
    </section>
  );
}
