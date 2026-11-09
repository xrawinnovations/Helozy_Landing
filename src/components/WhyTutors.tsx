import { ArrowRight } from 'lucide-react';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

/*
 * Stands in for testimonials until founding tutors give us real quotes (with written consent).
 * These are problems tutors raised, not quotes from named people. See
 * marketing/LANDING_PAGE_COPY.md §13 before publishing.
 */
const problems = [
  {
    title: 'I can’t write on my tutes',
    heard: 'I switch between several apps just to show a past paper, and still can’t write on it.',
    fix: 'Open your tute on the board and write on it live.',
  },
  {
    title: 'Strangers in my class',
    heard: 'A shared link spreads, and people who never paid join.',
    fix: 'Approve each student, then lock the room.',
  },
  {
    title: 'My Sunday goes on uploads',
    heard: 'Recordings take hours to upload and share safely.',
    fix: 'One click to record, private until you share it.',
  },
];

export function WhyTutors() {
  return (
    <section className="sec">
      <SectionHead
        eyebrow="Built with tutors"
        title={
          <>
            We asked tutors what wastes their <EndStop>time</EndStop>{' '}
            <span className="hi">
              Then we fixed <EndStop>it</EndStop>
            </span>
          </>
        }
      />
      <div className="why">
        {problems.map((p) => (
          <article key={p.title} className="why__card" data-reveal>
            <span className="why__mark" aria-hidden>
              &ldquo;
            </span>
            <h3>{p.title}</h3>
            <p>{p.heard}</p>
            <span className="why__fix">
              <ArrowRight size={16} /> {p.fix}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
