const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || '/demo';

export default function CtaBand() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-start justify-between gap-8 bg-navy px-6 py-16 text-white md:px-14 lg:flex-row lg:items-center"
    >
      <div>
        <h2 className="m-0 mb-[10px] text-[30px] font-black tracking-[-1px] md:text-[38px]">
          רוצים סוכן שמדבר בשפה שלכם?
        </h2>
        <p className="m-0 text-[17px] text-brand-muted-dark">
          הדגמה חיה על תרחיש אמיתי מהעסק שלכם. 15 דקות.
        </p>
      </div>
      <a
        href={DEMO_URL}
        className="flex-none rounded-[4px] bg-brand-cyan px-10 py-[18px] text-[18px] font-black text-navy no-underline shadow-hard-white hover:text-navy"
      >
        קבעו הדגמה חיה ←
      </a>
    </section>
  );
}
