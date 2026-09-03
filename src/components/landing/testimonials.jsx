const QUOTES = [
  {
    quote: '״90% מהשיחות נסגרות בלי נציג. הצוות שלנו מטפל רק במה שבאמת דורש בן אדם.״',
    author: 'מנהלת מוקד · רשת מרפאות שיניים',
  },
  {
    quote: '״לקוחות בטוחים שהם מדברים עם מזכירה. ההפתעה מגיעה רק כשמגלים שזה AI.״',
    author: 'בעלים · סוכנות ביטוח',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="grid grid-cols-1 gap-6 px-6 pb-16 md:px-14 lg:grid-cols-2">
      {QUOTES.map((q) => (
        <figure key={q.author} className="m-0 border-2 border-navy bg-white p-8 shadow-hard-cyan">
          <blockquote className="m-0 mb-[18px] text-[20px] font-semibold leading-[1.55]">
            {q.quote}
          </blockquote>
          <figcaption className="text-[14px] font-semibold text-brand-muted">{q.author}</figcaption>
        </figure>
      ))}
    </section>
  );
}
