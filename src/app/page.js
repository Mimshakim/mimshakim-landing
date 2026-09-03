import { CallProvider } from '@/components/landing/call-provider';
import SiteNav from '@/components/landing/site-nav';
import Hero from '@/components/landing/hero';
import StatsBand from '@/components/landing/stats-band';
import Verticals from '@/components/landing/verticals';
import Testimonials from '@/components/landing/testimonials';
import CtaBand from '@/components/landing/cta-band';
import SiteFooter from '@/components/landing/site-footer';
import CallFab from '@/components/landing/call-fab';

export default function HomePage() {
  return (
    <CallProvider>
      <div className="min-h-screen bg-cream text-navy">
        <SiteNav />
        <Hero />
        <StatsBand />
        <Verticals />
        <Testimonials />
        <CtaBand />
        <SiteFooter />
        <CallFab />
      </div>
    </CallProvider>
  );
}
