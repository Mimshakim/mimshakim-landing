import { V2Nav, V2Footer } from '@/components/landing-v2/landing-v2';
import DemoForm from './demo-form';

export const metadata = {
  title: 'לתיאום הדגמה | ממשקים, שירות מטופלים למרפאות',
  description:
    'הדגמה של 15 דקות על תרחיש אמיתי מהמרפאה שלכם: סוכן קולי שעונה וקובע תורים, משימות המשך ומאמן שיחות. בלי התחייבות.',
  alternates: { canonical: '/demo' },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white text-site-text">
      <V2Nav lang="he" />
      <main className="mx-auto max-w-[760px] px-6 py-20 text-center">
        <p className="m-0 mb-2 text-[19px] font-semibold text-link">הדגמה · 15 דקות</p>
        <h1 className="m-0 text-[clamp(40px,5.2vw,64px)] font-bold leading-[1.06] tracking-[-0.015em]">
          נראה לכם את זה
          <br />
          על המרפאה שלכם.
        </h1>
        <p className="mx-auto mb-12 mt-4 max-w-[560px] text-[19px] leading-[1.5] text-site-text2">
          ספרו לנו על המרפאה, ונבנה הדגמה שמדברת בשפה שלה: מענה טלפוני, קביעת תורים, משימות המשך והעברה לאדם.
          בלי התחייבות.
        </p>
        <DemoForm />
      </main>
      <V2Footer lang="he" />
    </div>
  );
}
