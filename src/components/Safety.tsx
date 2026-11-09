import { Building2, CameraOff, EyeOff, Lock, MicOff, ShieldCheck } from 'lucide-react';
import { EndStop } from './EndStop';
import { SectionHead } from './SectionHead';

const items = [
  { icon: CameraOff, title: 'Students’ cameras are never recorded' },
  { icon: Lock, title: 'Recordings stay private until you share them with your class' },
  { icon: MicOff, title: 'Students join muted, camera off' },
  { icon: ShieldCheck, title: 'You control who gets in and who speaks' },
  { icon: EyeOff, title: 'No ads, no tracking, and nobody’s data is sold' },
  { icon: Building2, title: 'Built with privacy in mind from day one' },
];

export function Safety() {
  return (
    <section className="sec" id="safety">
      <SectionHead
        eyebrow="Privacy first"
        title={
          <>
            Parents ask one <EndStop>question</EndStop>{' '}
            <span className="hi">
              You can answer <EndStop>yes</EndStop>
            </span>
          </>
        }
        lead="“Is my child safe in there?” Here’s what that means on HeloZy:"
      />
      <ul className="safety">
        {items.map(({ icon: Icon, title }) => (
          <li key={title} className="safety__item" data-reveal>
            <span className="safety__icon">
              <Icon size={22} />
            </span>
            {title}
          </li>
        ))}
      </ul>
    </section>
  );
}
