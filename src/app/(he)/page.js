import LandingV2 from '@/components/landing-v2/landing-v2';

/*
 * v2 "Apple-clean" landing page (Nov 2026).
 *
 * Rollback without a revert: the previous page is still in the repo. Restore it by
 * rendering <CallProvider><SiteNav/><Hero/><StatsBand/><Verticals/><Testimonials/>
 * <CtaBand/><SiteFooter/><CallFab/></CallProvider> from '@/components/landing/*'
 * (see git history of this file, commit 1987ae7). Note it was styled for Rubik
 * and a cream background, so reverting the merge commit is the cleaner rollback.
 */
export default function HomePage() {
  return <LandingV2 lang="he" />;
}
