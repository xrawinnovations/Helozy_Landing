import { Audience } from '@/components/Audience';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Faq } from '@/components/Faq';
import { Features } from '@/components/Features';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { Founders } from '@/components/Founders';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Nav } from '@/components/Nav';
import { Problem } from '@/components/Problem';
import { RealInternet } from '@/components/RealInternet';
import { Recordings } from '@/components/Recordings';
import { Reveals } from '@/components/Reveals';
import { Safety } from '@/components/Safety';
import { Statement } from '@/components/Statement';
import { Whiteboard } from '@/components/Whiteboard';
import { WhyTutors } from '@/components/WhyTutors';
import { show } from '@/lib/sections';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Statement />
        <Features />
        {show.whiteboard && <Whiteboard />}
        <Recordings />
        <HowItWorks />
        {show.realInternet && <RealInternet />}
        {show.safety && <Safety />}
        {show.beforeAfter && <BeforeAfter />}
        <WhyTutors />
        {show.audience && <Audience />}
        {show.founders && <Founders />}
        {show.faq && <Faq />}
        <FinalCta />
      </main>
      <Footer />
      {/* Last, so its scroll triggers are made after the pinned scenes above them. */}
      <Reveals />
    </>
  );
}
