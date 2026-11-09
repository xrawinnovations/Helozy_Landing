import type { ReactNode } from 'react';

/** Eyebrow, two-line headline (second line lime) and lead. Revealed by <Reveals />. */
export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="sec__head">
      <span className="eyebrow" data-reveal>
        <i /> {eyebrow}
      </span>
      <h2 className="sec__title">{title}</h2>
      {lead && (
        <p className="sec__lead" data-reveal>
          {lead}
        </p>
      )}
    </div>
  );
}
