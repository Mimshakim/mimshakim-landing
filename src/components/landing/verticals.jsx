const VERTICALS = [
  { n: '01', title: 'מוקדים טלפוניים', desc: 'מענה ראשוני, ניתוב והפחתת עומס נציגים' },
  { n: '02', title: 'מרפאות ובריאות', desc: 'תורים, תזכורות והנחיות למטופלים' },
  { n: '03', title: 'ביטוח', desc: 'תביעות, בירורי פוליסה וחידושים' },
  { n: '04', title: 'נדל"ן', desc: 'תיאום סיורים ומענה למתעניינים' },
  { n: '05', title: 'מסחר אונליין', desc: 'סטטוס הזמנות, החזרות ושירות', inverted: true },
];

export default function Verticals() {
  return (
    <section id="verticals" className="px-6 py-16 md:px-14 md:py-16">
      <h2 className="m-0 mb-9 text-[32px] font-black tracking-[-1px] md:text-[40px]">
        תחום אחד, חמש תעשיות.
      </h2>
      {/* Cells drop their inline-end border so neighbours share a single 2px rule;
          stacked below lg, the negative gap collapses the horizontal ones instead. */}
      <div className="flex flex-col max-lg:-space-y-[2px] lg:grid lg:grid-cols-5">
        {VERTICALS.map((v) => (
          <div
            key={v.n}
            className={[
              'border-2 border-navy px-[18px] py-6',
              v.inverted ? 'bg-navy text-white' : 'lg:border-e-0',
            ].join(' ')}
          >
            <div
              className={[
                'mb-[10px] text-[12px] font-extrabold tracking-[1px]',
                v.inverted ? 'text-brand-cyan-bright' : 'text-brand-cyan-text',
              ].join(' ')}
            >
              {v.n}
            </div>
            <div className="mb-[6px] text-[16px] font-extrabold">{v.title}</div>
            <div
              className={[
                'text-[13px] leading-[1.55]',
                v.inverted ? 'text-brand-muted-dark' : 'text-brand-muted',
              ].join(' ')}
            >
              {v.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
