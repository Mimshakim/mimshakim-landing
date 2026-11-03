import { Heebo } from 'next/font/google';

/** Production origin. The apex mimshakim.com redirects here (Vercel domain config). */
export const SITE_URL = 'https://www.mimshakim.com';

export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-heebo',
});

/** Marks <html> as JS-enabled before paint so scroll reveals never hide content without JS. */
export const JS_FLAG_SCRIPT = "document.documentElement.classList.add('js')";

export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630 };

export const LANGUAGE_ALTERNATES = { he: '/', en: '/en', 'x-default': '/' };
