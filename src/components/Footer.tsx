import Image from 'next/image';
import { links } from '@/lib/links';
import { show } from '@/lib/sections';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Image src="/helozy-logo-dark-bg.svg" alt="HeloZy" width={116} height={32} />
        <p>The online classroom for tutors.</p>
      </div>
      <nav className="footer__links" aria-label="Footer">
        <a href="#features">Features</a>
        {show.whiteboard && <a href="#whiteboard">Whiteboard</a>}
        <a href="#recordings">Recordings</a>
        {show.faq && <a href="#faq">FAQ</a>}
        <a href={links.signIn}>Sign in</a>
        <a href={links.privacy}>Privacy</a>
        <a href={links.terms}>Terms</a>
      </nav>
      <p className="footer__legal">© 2026 HeloZy</p>
    </footer>
  );
}
