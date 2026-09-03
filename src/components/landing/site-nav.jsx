import Image from 'next/image';

const LOGIN_URL = process.env.NEXT_PUBLIC_DASHBOARD_LOGIN_URL || 'https://app.mimshakim.com/login';
const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || '/demo';

const LINKS = [
  { label: 'הפתרון', href: '#solution' },
  { label: 'תחומים', href: '#verticals' },
  { label: 'לקוחות', href: '#testimonials' },
];

export default function SiteNav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-navy px-6 py-5 md:px-14">
      <div className="flex items-center gap-3">
        <Image src="/meetinx-logo-white.png" alt="ממשקים" width={44} height={44} className="h-11 w-11" priority />
        <span className="text-[25px] font-black tracking-[-1px]">ממשקים</span>
      </div>

      <nav className="hidden gap-[30px] text-[15px] font-semibold lg:flex">
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} className="no-underline">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-[14px]">
        {/* Locale toggle. Renders as in the design; wire to the EN route
            (and re-add the `en` hreflang in layout.js) once that page exists. */}
        <span className="cursor-pointer border-b-2 border-brand-cyan pb-[2px] text-[13px] font-extrabold">
          EN / עב
        </span>
        <a
          href={LOGIN_URL}
          className="rounded-[4px] border-2 border-navy px-[22px] py-3 text-[15px] font-bold no-underline transition-colors hover:bg-navy hover:text-white"
        >
          התחברות
        </a>
        <a
          href={DEMO_URL}
          className="rounded-[4px] bg-navy px-[26px] py-3 text-[15px] font-extrabold text-white no-underline hover:text-white"
        >
          קבעו הדגמה ←
        </a>
      </div>
    </header>
  );
}
