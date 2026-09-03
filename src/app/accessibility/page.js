import Link from 'next/link';

export const metadata = {
  title: 'הצהרת נגישות | ממשקים',
  description: 'הצהרת הנגישות של אתר ממשקים, בהתאם לתקן הישראלי ת"י 5568 ולתקנות שוויון זכויות לאנשים עם מוגבלות.',
  alternates: { canonical: '/accessibility' },
  robots: { index: true, follow: true },
};

const UPDATED = '3 בספטמבר 2026';
const CONTACT_EMAIL = 'info@mimshakim.com';

export default function AccessibilityPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-14">
      <Link href="/" className="text-[13px] font-extrabold tracking-[1px] text-brand-cyan-text no-underline">
        ← חזרה לעמוד הבית
      </Link>

      <h1 className="mt-6 text-[40px] font-black leading-[1.1] tracking-[-1px]">הצהרת נגישות</h1>
      <p className="mt-3 text-[13px] text-brand-muted">עודכן לאחרונה: {UPDATED}</p>

      <div className="mt-10 space-y-8 text-[17px] leading-[1.7] text-brand-muted">
        <section>
          <h2 className="mb-2 text-[22px] font-extrabold text-navy">המחויבות שלנו</h2>
          <p>
            ממשקים רואה בנגישות האתר חלק בלתי נפרד מהשירות. אנו פועלים להנגיש את האתר לאנשים עם מוגבלות
            בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח־1998, לתקנות שוויון זכויות לאנשים עם מוגבלות
            (התאמות נגישות לשירות), התשע"ג־2013, ולתקן הישראלי ת"י 5568 המאמץ את הנחיות WCAG 2.0 ברמה AA.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[22px] font-extrabold text-navy">רמת הנגישות באתר</h2>
          <p>
            האתר נבנה כך שיעמוד ברמה AA של תקן ת"י 5568. בין היתר יושמו: מבנה כותרות היררכי, ניגודיות
            צבעים תקנית בין טקסט לרקע, טקסט חלופי לתמונות, תמיכה בניווט מקלדת ובקוראי מסך, שמירה על סדר
            קריאה הגיוני בעברית (כיווניות RTL), והימנעות מהסתמכות על צבע בלבד להעברת מידע.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[22px] font-extrabold text-navy">רכיב השיחה הקולית</h2>
          <p>
            האתר כולל רכיב המאפשר לנהל שיחה קולית עם הסוכן החכם ישירות מהדפדפן. הפעלת הרכיב דורשת אישור
            גישה למיקרופון, והוא אינו תנאי לשימוש באתר או לקבלת השירות — כל המידע והפעולות זמינים גם
            באמצעות טופס קביעת ההדגמה או בפנייה אלינו בדרכים המפורטות מטה. במהלך השיחה מוצגות כתוביות
            חיות של הדברים הנאמרים, כחלופה חזותית למשתמשים שאינם יכולים להסתמך על שמע בלבד.
          </p>
          <p className="mt-3">
            שימו לב: במהלך השיחה נאספים פרטים שתמסרו (כגון שם, טלפון ושם העסק) וכן סיכום תמציתי של
            השיחה, לצורך יצירת קשר חוזר.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[22px] font-extrabold text-navy">הסדרי נגישות שטרם הושלמו</h2>
          <p>
            ייתכן שבחלקים מסוימים באתר, ובפרט ברכיבים חיצוניים ובתכנים שהתווספו לאחרונה, טרם הושלמה
            ההנגשה המלאה. אנו ממשיכים לתקן ליקויים באופן שוטף. אם נתקלתם בתקלה או בקושי, נשמח שתעדכנו
            אותנו ונטפל בכך בהקדם.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[22px] font-extrabold text-navy">רכז הנגישות — פנייה ומשוב</h2>
          <p>
            נתקלתם בבעיית נגישות באתר? נשמח לשמוע. פנייה בנושא נגישות תיענה בתוך זמן סביר, ואנו נעשה
            כמיטב יכולתנו לספק פתרון.
          </p>
          <p className="mt-3">
            דוא"ל:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-cyan-text">
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
