import '../../globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SITE_URL, heebo, JS_FLAG_SCRIPT, OG_IMAGE, LANGUAGE_ALTERNATES } from '@/lib/site';

const TITLE = 'Mimshakim | The clinic answers. Always. Patient service for clinics';
const DESCRIPTION =
  'A patient-service platform for clinics: a Hebrew voice agent that answers 24/7 and books appointments, follow-up tasks so no patient is forgotten, and a live coach for the front desk. All on one screen.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/en', languages: LANGUAGE_ALTERNATES },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/en',
    siteName: 'Mimshakim',
    locale: 'en_US',
    alternateLocale: ['he_IL'],
    type: 'website',
    images: [{ ...OG_IMAGE, url: '/og-en.png', alt: 'Mimshakim: The clinic answers. Always.' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-en.png'] },
};

export const viewport = { themeColor: '#F5F5F7' };

export default function EnglishRootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={heebo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }} />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
