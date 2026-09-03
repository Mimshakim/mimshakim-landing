'use client';

import { useState } from 'react';

const INDUSTRIES = [
  'מוקד טלפוני',
  'מרפאה / בריאות',
  'ביטוח',
  'נדל"ן',
  'מסחר אונליין',
  'אחר',
];

const FIELD =
  'w-full rounded-[4px] border-2 border-navy bg-white px-4 py-3 text-[15px] outline-none focus:border-brand-cyan-text';
const LABEL = 'mb-2 block text-[13px] font-extrabold tracking-[1px] text-brand-cyan-text';

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
      form.reset();
    } catch (err) {
      setStatus('error');
      setError('לא הצלחנו לשלוח את הפנייה. נסו שוב, או כתבו לנו ל-hello@mimshakim.com.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-2 border-navy bg-white p-10 text-center shadow-hard-cyan">
        <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-brand-success bg-[rgba(43,224,128,.15)] text-[30px] text-brand-success">
          ✓
        </div>
        <div className="mb-3 text-[24px] font-black tracking-[-1px]">קיבלנו. נחזור אליכם.</div>
        <p className="m-0 text-[16px] leading-[1.6] text-brand-muted">
          ניצור קשר תוך יום עסקים אחד לתיאום הדגמה של 15 דקות על תרחיש אמיתי מהעסק שלכם.
        </p>
        <a href="/" className="mt-6 inline-block text-[14px] font-bold underline">
          חזרה לדף הבית
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border-2 border-navy bg-white p-8 shadow-hard-cyan md:p-10">
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
      <label className="mt-6 flex items-start gap-3 text-[14px] leading-[1.55] text-brand-muted">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 flex-none accent-[#00C2E0]" />
        <span>אני מאשר/ת שתיצרו איתי קשר בטלפון, במייל או ב-WhatsApp לגבי ההדגמה.</span>
      </label>

      {status === 'error' && (
        <div role="alert" className="mt-5 rounded-[4px] border-2 border-brand-danger bg-brand-danger/10 px-4 py-3 text-[14px]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-7 rounded-[4px] bg-brand-cyan px-[34px] py-4 text-[17px] font-black text-navy shadow-hard disabled:opacity-60"
      >
        {status === 'sending' ? 'שולחים…' : 'שלחו ונתאם הדגמה ←'}
      </button>
    </form>
  );
}
