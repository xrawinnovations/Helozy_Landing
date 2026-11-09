'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

const faqs = [
  {
    q: 'Do my students need to install anything?',
    a: 'No. They tap the link and join in Chrome, Edge, Safari or Firefox, on a laptop, tablet or phone.',
  },
  {
    q: 'Does it work with my WhatsApp group?',
    a: 'Yes. Share your class link there, and HeloZy prepares each reminder as a WhatsApp message you post in one tap.',
  },
  {
    q: 'What about students with slow internet?',
    a: 'We tested at 300 kbps. Students start with their cameras off, and low-bandwidth mode keeps weak connections in class.',
  },
  {
    q: 'Who can see my recordings?',
    a: 'Only you, until you share one with your class. You can also turn downloads off.',
  },
  {
    q: 'Can I write on my own PDFs?',
    a: 'Yes. Open any PDF tute or past paper on the board and write on it live.',
  },
  {
    q: 'Will my drawing tablet or iPad work?',
    a: 'Yes: mouse, drawing tablets, iPad with Apple Pencil and Android styluses.',
  },
  {
    q: 'Is it only for maths and science?',
    a: 'It has STEM tools like equations and graph paper, but any subject works.',
  },
];

/** One answer open at a time; the panel slides open with a grid-row transition. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec" id="faq">
      <SectionHead
        eyebrow="FAQ"
        title={
          <>
            Questions tutors <EndStop>ask</EndStop>{' '}
            <span className="hi">
              Straight <EndStop>answers</EndStop>
            </span>
          </>
        }
      />
      <ul className="faq">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className={`faq__item${isOpen ? ' is-open' : ''}`} data-reveal>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <span className="faq__icon" aria-hidden>
                    <Plus size={18} />
                  </span>
                </button>
              </h3>
              <div className="faq__answer" id={`faq-${i}`} role="region">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
