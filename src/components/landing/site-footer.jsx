import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="flex flex-wrap justify-between gap-3 px-6 py-5 text-[12.5px] text-brand-muted md:px-14">
      <span>© ממשקים · בוט קולי לשירות לקוחות בעברית</span>
      {/* פרטיות / תנאים are intentionally absent until those pages exist —
          a dead link is worse than a missing one. נגישות is not optional:
          תקן ישראלי 5568 requires a reachable accessibility statement. */}
      <Link href="/accessibility" className="no-underline hover:underline">
        הצהרת נגישות
      </Link>
    </footer>
  );
}
