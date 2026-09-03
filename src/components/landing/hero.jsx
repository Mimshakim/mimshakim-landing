'use client';

import CallWidget from './call-widget';
import { useCall } from './call-provider';

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || '/demo';

export default function Hero() {
  const { startCall } = useCall();

  return (
    <section id="solution" className="grid min-h-[580px] grid-cols-1 lg:grid-cols-[1.15fr_.85fr]">
      <div className="flex flex-col justify-center border-b-2 border-navy px-6 py-16 md:px-14 md:py-[72px] lg:border-b-0 lg:border-e-2">
        <div className="mb-5 text-[14px] font-extrabold tracking-[2px] text-brand-cyan-text">
          AI VOICE AGENTS · שירות לקוחות
        </div>
        <h1 className="m-0 mb-6 text-[44px] font-black leading-[1.05] tracking-[-2px] md:text-[64px]">
          הטלפון מצלצל.
          <br />
          הסוכן שלנו
          <br />
          <span className="text-brand-cyan-text">כבר ענה.</span>
        </h1>
        <p className="m-0 mb-8 max-w-[440px] text-[19px] leading-[1.6] text-brand-muted">
          בוט קולי בעברית שמנהל שיחות שירות אמיתיות: קובע תורים, מברר, מעדכן — ומעביר לנציג רק כשבאמת צריך.
        </p>
        <div className="flex flex-wrap gap-[14px]">
          <button
            type="button"
            onClick={startCall}
            className="rounded-[4px] bg-brand-cyan px-[34px] py-4 text-[17px] font-black text-navy shadow-hard"
          >
            🎙 דברו עם הסוכן עכשיו
          </button>
          <a
            href={DEMO_URL}
            className="rounded-[4px] border-2 border-navy px-7 py-4 text-[16px] font-bold no-underline"
          >
            קבעו הדגמה
          </a>
        </div>
        <div className="mt-[22px] flex flex-wrap gap-[22px] text-[13px] text-brand-muted">
          <span>✓ שיחה מהדפדפן, בלי להתקשר</span>
          <span>✓ עברית ואנגלית</span>
          <span>✓ בחינם</span>
        </div>
      </div>

      <CallWidget />
    </section>
  );
}
