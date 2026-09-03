const STATS = [
  { value: '24/7', label: 'מענה בלי הפסקה' },
  { value: '98%', label: 'שיחות נענות' },
  { value: "3 שנ'", label: 'עד מענה' },
];

export default function StatsBand() {
  return (
    <section className="grid grid-cols-2 border-y-2 border-navy lg:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.value} className="border-e-2 border-navy p-[26px] text-center">
          <div className="text-[34px] font-black">{stat.value}</div>
          <div className="text-[13.5px] text-brand-muted">{stat.label}</div>
        </div>
      ))}
      <div className="bg-brand-cyan p-[26px] text-center">
        <div className="text-[34px] font-black">₪0</div>
        <div className="text-[13.5px] font-bold">עלות שיחה שהוחמצה</div>
      </div>
    </section>
  );
}
