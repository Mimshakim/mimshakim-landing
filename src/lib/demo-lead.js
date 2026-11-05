/**
 * Demo-request validation, shared by the /demo form (browser) and
 * /api/demo-request (server) so both enforce the same rules and messages.
 *
 * validateLead(values) -> { errors: { field: hebrewMessage }, clean: {...} }
 * An empty `errors` object means the lead can be sent.
 */

export const LIMITS = { name: 200, company: 200, email: 200, notes: 2000 };

const COMMON_EMAIL_TYPOS = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.co.il': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'yahoo.con': 'yahoo.com',
  'walla.co': 'walla.co.il',
  'walla.com': 'walla.co.il',
  'outlok.com': 'outlook.com',
  'icloud.con': 'icloud.com',
};

/** Digits only, with a leading + kept. */
export function normalizePhone(raw) {
  const s = String(raw || '').trim();
  const plus = s.startsWith('+');
  const digits = s.replace(/\D/g, '');
  return plus ? `+${digits}` : digits;
}

export function validatePhone(raw) {
  const s = String(raw || '').trim();
  if (!s) return 'נא להזין מספר טלפון.';
  if (/[^\d\s\-+().]/.test(s)) return 'מספר טלפון יכול להכיל רק ספרות, רווחים, מקפים ו־+.';
  if (s.indexOf('+') > 0) return 'הסימן + יכול להופיע רק בתחילת המספר.';

  const n = normalizePhone(s);
  // Israeli numbers: 0XX-XXXXXXX (mobile, 10 digits) or 0X-XXXXXXX (landline, 9 digits),
  // or the same without the leading 0 after +972.
  if (n.startsWith('+972') || n.startsWith('972')) {
    const rest = n.replace(/^\+?972/, '').replace(/^0/, '');
    if (rest.length < 8) return 'מספר הטלפון קצר מדי. לדוגמה: ‎+972-50-1234567';
    if (rest.length > 9) return 'מספר הטלפון ארוך מדי. לדוגמה: ‎+972-50-1234567';
    return '';
  }
  if (n.startsWith('+')) {
    // Other countries: accept a plausible international number.
    const len = n.length - 1;
    if (len < 8) return 'מספר הטלפון קצר מדי.';
    if (len > 15) return 'מספר הטלפון ארוך מדי.';
    return '';
  }
  if (!n.startsWith('0')) return 'מספר ישראלי מתחיל ב־0 (למשל 050-1234567), או בקידומת ‎+972.';
  if (n.length < 9 || (/^05/.test(n) && n.length < 10)) return 'מספר הטלפון קצר מדי. לדוגמה: 050-1234567';
  if (n.length > 10) return 'מספר הטלפון ארוך מדי. לדוגמה: 050-1234567';
  if (n.length === 10 && !/^05|^07/.test(n)) return 'מספר בן 10 ספרות צריך להתחיל ב־05 או 07. בדקו שאין ספרה מיותרת.';
  return '';
}

export function validateEmail(raw) {
  const s = String(raw || '').trim();
  if (!s) return 'נא להזין כתובת מייל.';
  if (/\s/.test(s)) return 'כתובת המייל לא יכולה להכיל רווחים.';
  if (/[א-ת]/.test(s)) return 'כתובת המייל נכתבת באנגלית. ייתכן שהמקלדת בעברית.';
  const at = s.split('@').length - 1;
  if (at === 0) return 'חסר הסימן @ בכתובת המייל. לדוגמה: name@clinic.co.il';
  if (at > 1) return 'בכתובת המייל יש יותר מ־@ אחד.';
  const [local, domain] = s.split('@');
  if (!local) return 'חסר החלק שלפני ה־@.';
  if (!domain) return 'חסר החלק שאחרי ה־@, למשל gmail.com.';
  if (!domain.includes('.')) return 'חסרה סיומת לכתובת, למשל ‎.com או ‎.co.il.';
  if (/\.\./.test(s) || domain.startsWith('.') || domain.endsWith('.') || local.endsWith('.') || local.startsWith('.'))
    return 'יש נקודה במקום לא תקין בכתובת המייל.';
  if (!/\.[A-Za-z]{2,}$/.test(domain)) return 'הסיומת של הכתובת לא תקינה, למשל ‎.com או ‎.co.il.';
  if (!/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(s)) return 'כתובת המייל לא תקינה. בדקו שאין תווים מיוחדים.';
  if (s.length > LIMITS.email) return 'כתובת המייל ארוכה מדי.';
  return '';
}

/** A "did you mean" suggestion for common domain typos, or ''. */
export function suggestEmail(raw) {
  const s = String(raw || '').trim().toLowerCase();
  const [local, domain] = s.split('@');
  if (!local || !domain) return '';
  const fix = COMMON_EMAIL_TYPOS[domain];
  return fix ? `${local}@${fix}` : '';
}

export function validateLead(values) {
  const v = values || {};
  const name = String(v.name || '').trim();
  const company = String(v.company || '').trim();
  const notes = String(v.notes || '').trim();
  const consent = v.consent === true || v.consent === 'on' || v.consent === 'true';
  const errors = {};

  if (!name) errors.name = 'נא להזין שם מלא.';
  else if (name.length < 2) errors.name = 'השם קצר מדי.';
  else if (name.length > LIMITS.name) errors.name = 'השם ארוך מדי.';
  else if (/\d{4,}/.test(name)) errors.name = 'נראה שהוזן מספר בשדה השם. את הטלפון כתבו בשדה ״טלפון״.';

  if (!company) errors.company = 'נא להזין את שם המרפאה או העסק.';
  else if (company.length > LIMITS.company) errors.company = 'שם העסק ארוך מדי.';

  const phoneErr = validatePhone(v.phone);
  if (phoneErr) errors.phone = phoneErr;

  const emailErr = validateEmail(v.email);
  if (emailErr) errors.email = emailErr;

  if (notes.length > LIMITS.notes) errors.notes = `ההודעה ארוכה מדי (עד ${LIMITS.notes} תווים).`;

  if (!consent) errors.consent = 'כדי שנוכל לחזור אליכם, יש לאשר יצירת קשר.';

  return {
    errors,
    clean: {
      name,
      company,
      phone: normalizePhone(v.phone),
      email: String(v.email || '').trim().toLowerCase(),
      industry: String(v.industry || '').trim().slice(0, 100) || null,
      notes: notes || null,
    },
  };
}
