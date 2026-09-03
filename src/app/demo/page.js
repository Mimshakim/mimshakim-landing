import SiteNav from '@/components/landing/site-nav';
import SiteFooter from '@/components/landing/site-footer';
import DemoForm from './demo-form';

export const metadata = {
  title: 'קבעו הדגמה | ממשקים — סוכן קולי AI לשירות לקוחות',
  description:
    'הדגמה חיה של סוכן קולי AI בעברית על תרחיש אמיתי מהעסק שלכם. 15 דקות, בלי התחייבות.',
  alternates: { canonical: '/demo' },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <SiteNav />
      <main className="mx-auto max-w-[900px] px-6 py-16 md:px-14">
        <div className="mb-5 text-[14px] font-extrabold tracking-[2px] text-brand-cyan-text">
          הדגמה חיה · 15 דקות
        </div>
        <h1 className="m-0 mb-6 text-[40px] font-black leading-[1.05] tracking-[-2px] md:text-[56px]">
          נראה לכם את הסוכן
          <br />
          <span className="text-brand-cyan-text">על תרחיש שלכם.</span>
        </h1>
        <p className="m-0 mb-10 max-w-[560px] text-[19px] leading-[1.6] text-brand-muted">
          ספרו לנו על העסק ונבנה הדגמה שמדברת בשפה שלו — כולל קביעת תורים, בירורים והעברה לנציג.
          בלי התחייבות.
        </p>
        <DemoForm />
      </main>
      <SiteFooter />
    </div>
  );
}
