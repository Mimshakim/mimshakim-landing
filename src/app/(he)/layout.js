import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SITE_URL, heebo, JS_FLAG_SCRIPT, OG_IMAGE, LANGUAGE_ALTERNATES } from '@/lib/site';

const TITLE = 'ממשקים | המרפאה עונה. תמיד. שירות מטופלים למרפאות';
const DESCRIPTION =
  'פלטפורמת שירות מטופלים למרפאות: סוכן קולי בעברית שעונה 24/7 וקובע תורים, משימות המשך כדי שאף מטופל לא יישכח, ומאמן שיחות למזכירות. הכל במסך אחד.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['מענה קולי למרפאה', 'סוכן קולי AI', 'מזכירה וירטואלית למרפאה', 'קביעת תורים אוטומטית', 'שירות מטופלים', 'מרפאת שיניים'],
  alternates: { canonical: '/', languages: LANGUAGE_ALTERNATES },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: 'ממשקים',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [{ ...OG_IMAGE, alt: 'ממשקים: המרפאה עונה. תמיד.' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

export const viewport = { themeColor: '#F5F5F7' };

export default function HebrewRootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable} suppressHydrationWarning>
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
