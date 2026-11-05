'use client';

import { useRef, useState } from 'react';
import { trackEvent } from '@/components/landing-v2/client';
import { LIMITS, suggestEmail, validateLead } from '@/lib/demo-lead';

const INDUSTRIES = [
  'מרפאת שיניים',
  'מרפאה / בריאות',
  'מוקד טלפוני',
  'ביטוח',
  'נדל"ן',
  'מסחר אונליין',
  'אחר',
];

const CONTACT_EMAIL = 'adam@mimshakim.com';
const FIELD_ORDER = ['name', 'company', 'phone', 'email', 'notes', 'consent'];
const EMPTY = { name: '', company: '', phone: '', email: '', industry: '', notes: '', consent: false };

const FIELD_BASE =
  'w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-site-text outline-none transition-colors focus:ring-2';
const FIELD_OK = 'border-[#D2D2D7] focus:border-link focus:ring-teal-tint';
const FIELD_BAD = 'border-orange bg-[#FFF8F4] focus:border-orange focus:ring-orange-tint';
const LABEL = 'mb-2 block text-[14px] font-semibold text-site-text';

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="m-0 mt-[6px] flex items-start gap-[6px] text-[13px] leading-[1.45] text-orange-text">
      <span aria-hidden="true" className="mt-[1px] flex h-4 w-4 flex-none items-center justify-center rounded-full bg-orange text-[11px] font-bold text-white">
        !
      </span>
      <span>{children}</span>
    </p>
  );
}

/** mailto: with the visitor's details, so a lead is never lost when our relay is down. */
function mailtoFor(values) {
  const lines = [
    `שם: ${values.name}`,
    `עסק: ${values.company}`,
    `טלפון: ${values.phone}`,
    `אימייל: ${values.email}`,
    values.industry ? `תחום: ${values.industry}` : '',
    values.notes ? `הערות: ${values.notes}` : '',
  ].filter(Boolean);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('בקשה להדגמה מהאתר')}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export default function DemoForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [failure, setFailure] = useState(null); // null | { values }
  const refs = useRef({});

  const { errors: liveErrors } = validateLead(values);
  // Show a field's error once the visitor has left it, or after a submit attempt.
  const errorFor = (f) => serverErrors[f] || ((touched[f] || submitted) && liveErrors[f]) || '';
  const errorCount = FIELD_ORDER.filter((f) => liveErrors[f]).length;
  const emailSuggestion = !liveErrors.email ? suggestEmail(values.email) : '';

  function set(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    if (serverErrors[field]) setServerErrors(({ [field]: _, ...rest }) => rest);
  }
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  function focusFirst(errs) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) refs.current[first]?.focus();
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setFailure(null);

    const { errors } = validateLead(values);
    if (Object.keys(errors).length) {
      trackEvent('demo_submit_invalid', { fields: Object.keys(errors).join(',') });
      focusFirst(errors);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 400 && body.fields) {
        setServerErrors(body.fields);
        setStatus('idle');
        focusFirst(body.fields);
        return;
      }
      if (!res.ok) throw new Error(body.error || `http-${res.status}`);
      setStatus('sent');
      trackEvent('demo_submit', { industry: values.industry || 'none' });
    } catch (err) {
      setStatus('error');
      setFailure({ values });
      trackEvent('demo_submit_failed', { reason: String(err?.message || 'network').slice(0, 40) });
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

  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => set(name, e.target.value),
    onBlur: blur(name),
    ref: (el) => (refs.current[name] = el),
    'aria-invalid': errorFor(name) ? true : undefined,
    'aria-describedby': errorFor(name) ? `${name}-error` : undefined,
    className: `${FIELD_BASE} ${errorFor(name) ? FIELD_BAD : FIELD_OK}`,
  });

  const showSummary = submitted && errorCount > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[18px] bg-site-gray p-6 text-start md:p-10">
      {showSummary && (
        <div role="alert" className="mb-6 rounded-xl border border-orange bg-orange-tint px-4 py-3 text-[14px] text-orange-text">
          {errorCount === 1 ? 'יש שדה אחד שצריך לתקן לפני השליחה.' : `יש ${errorCount} שדות שצריך לתקן לפני השליחה.`}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">שם מלא *</label>
          <input {...field('name')} autoComplete="name" maxLength={LIMITS.name} />
          <FieldError id="name-error">{errorFor('name')}</FieldError>
        </div>
        <div>
          <label className={LABEL} htmlFor="company">שם המרפאה או העסק *</label>
          <input {...field('company')} autoComplete="organization" maxLength={LIMITS.company} />
          <FieldError id="company-error">{errorFor('company')}</FieldError>
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">טלפון *</label>
          <input
            {...field('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="050-1234567"
            style={{ textAlign: 'right' }}
          />
          <FieldError id="phone-error">{errorFor('phone')}</FieldError>
        </div>
        <div>
          <label className={LABEL} htmlFor="email">אימייל *</label>
          <input
            {...field('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            placeholder="name@clinic.co.il"
            style={{ textAlign: 'right' }}
          />
          <FieldError id="email-error">{errorFor('email')}</FieldError>
          {emailSuggestion && (
            <p className="m-0 mt-[6px] text-[13px] text-site-text2">
              האם התכוונתם ל־
              <button
                type="button"
                onClick={() => set('email', emailSuggestion)}
                className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-link underline"
                dir="ltr"
              >
                {emailSuggestion}
              </button>
              ?
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="industry">תחום</label>
          <select
            id="industry"
            name="industry"
            value={values.industry}
            onChange={(e) => set('industry', e.target.value)}
            className={`${FIELD_BASE} ${FIELD_OK}`}
          >
            <option value="" disabled>בחרו תחום</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={LABEL} htmlFor="notes">מה תרצו שהסוכן יעשה?</label>
          <textarea {...field('notes')} rows={4} />
          <div className="flex justify-between gap-3">
            <FieldError id="notes-error">{errorFor('notes')}</FieldError>
            {values.notes.length > LIMITS.notes * 0.8 && (
              <span className={`ms-auto mt-[6px] text-[12px] ${values.notes.length > LIMITS.notes ? 'text-orange-text' : 'text-site-text2'}`}>
                {values.notes.length}/{LIMITS.notes}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Explicit opt-in — Israeli anti-spam law (תיקון 40 לחוק התקשורת). */}
      <label className="mt-6 flex items-start gap-3 text-[14px] leading-[1.55] text-site-text2">
        <input
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={(e) => {
            set('consent', e.target.checked);
            setTouched((t) => ({ ...t, consent: true }));
          }}
          ref={(el) => (refs.current.consent = el)}
          aria-invalid={errorFor('consent') ? true : undefined}
          aria-describedby={errorFor('consent') ? 'consent-error' : undefined}
          className="mt-1 h-4 w-4 flex-none accent-[#0F7A6A]"
        />
        <span>אני מאשר/ת שתיצרו איתי קשר בטלפון, במייל או ב-WhatsApp לגבי ההדגמה. *</span>
      </label>
      <FieldError id="consent-error">{errorFor('consent')}</FieldError>

      {status === 'error' && failure && (
        <div role="alert" className="mt-5 rounded-xl border border-orange bg-orange-tint px-4 py-3 text-[14px] leading-[1.6] text-orange-text">
          <strong className="font-semibold">הפנייה לא נשלחה בגלל תקלה אצלנו, לא בגלל הפרטים שמילאתם.</strong>
          <br />
          אפשר לנסות שוב בעוד רגע, או{' '}
          <a href={mailtoFor(failure.values)} className="font-semibold text-orange-text underline">
            לשלוח לנו את הפרטים במייל
          </a>{' '}
          ({CONTACT_EMAIL}). הפרטים כבר ממולאים בהודעה.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="v2-btn mt-7 cursor-pointer border-0 disabled:cursor-progress disabled:opacity-60"
      >
        {status === 'sending' ? 'שולחים…' : status === 'error' ? 'לנסות שוב' : 'שלחו ונתאם הדגמה'}
      </button>
    </form>
  );
}
