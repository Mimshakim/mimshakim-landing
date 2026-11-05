'use client';

import { useState } from 'react';
import { trackEvent } from '@/components/landing-v2/client';

const INDUSTRIES = [
  'מרפאת שיניים',
  'מרפאה / בריאות',
  'מוקד טלפוני',
  'ביטוח',
  'נדל"ן',
  'מסחר אונליין',
  'אחר',
];

const FIELD =
  'w-full rounded-xl border border-[#D2D2D7] bg-white px-4 py-3 text-[16px] text-site-text outline-none focus:border-link focus:ring-2 focus:ring-teal-tint';
const LABEL = 'mb-2 block text-[14px] font-semibold text-site-text';

export default function DemoForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'request-failed');
      }
      setStatus('sent');
      trackEvent('demo_submit', { industry: payload.industry || 'none' });
      form.reset();
    } catch (err) {
      setStatus('error');
      setError('לא הצלחנו לשלוח את הפנייה. נסו שוב, או כתבו לנו ל-adam@mimshakim.com.');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-[18px] bg-site-gray p-10 text-center">
        <div className="mx-auto mb-5 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-teal text-[28px] text-white" aria-hidden="true">
          ✓
        </div>
        <div className="mb-3 text-[26px] font-bold">קיבלנו. נחזור אליכם.</div>
        <p className="m-0 text-[17px] leading-[1.6] text-site-text2">
          ניצור קשר תוך יום עסקים אחד לתיאום הדגמה של 15 דקות על תרחיש אמיתי מהמרפאה שלכם.
        </p>
        <a href="/" className="mt-6 inline-block text-[15px]">
          חזרה לדף הבית
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[18px] bg-site-gray p-6 text-start md:p-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">שם מלא *</label>
          <input id="name" name="name" required autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="company">שם העסק *</label>
          <input id="company" name="company" required autoComplete="organization" className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">טלפון *</label>
          <input id="phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">אימייל *</label>
          <input id="email" name="email" required type="email" autoComplete="email" className={FIELD} />
        </div>
        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="industry">תחום</label>
          <select id="industry" name="industry" defaultValue="" className={FIELD}>
            <option value="" disabled>בחרו תחום</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="notes">מה תרצו שהסוכן יעשה?</label>
          <textarea id="notes" name="notes" rows={4} className={FIELD} />
        </div>
      </div>

      {/* Explicit opt-in — Israeli anti-spam law (תיקון 40 לחוק התקשורת). */}
      <label className="mt-6 flex items-start gap-3 text-[14px] leading-[1.55] text-site-text2">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 flex-none accent-[#0F7A6A]" />
        <span>אני מאשר/ת שתיצרו איתי קשר בטלפון, במייל או ב-WhatsApp לגבי ההדגמה.</span>
      </label>

      {status === 'error' && (
        <div role="alert" className="mt-5 rounded-xl border border-orange bg-orange-tint px-4 py-3 text-[14px] text-orange-text">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="v2-btn mt-7 cursor-pointer border-0 disabled:opacity-60"
      >
        {status === 'sending' ? 'שולחים…' : 'שלחו ונתאם הדגמה'}
      </button>
    </form>
  );
}
