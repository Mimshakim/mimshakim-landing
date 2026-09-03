import './globals.css';

const SITE_URL = 'https://mimshakim.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ממשקים | מענה קולי חכם AI לשירות לקוחות 24/7',
  description:
    'סוכן קולי AI בעברית שעונה לכל שיחה 24/7: קובע תורים, מברר, מעדכן ומעביר לנציג רק כשצריך. מזכירה וירטואלית לעסק עם קביעת תורים אוטומטית — דברו עם הסוכן עכשיו מהדפדפן.',
  keywords: [
    'מענה קולי חכם',
    'סוכן קולי AI',
    'מוקד טלפוני AI',
    'בוט קולי בעברית',
    'מזכירה וירטואלית לעסק',
    'קביעת תורים אוטומטית',
  ],
  icons: { icon: '/favicon.ico' },
  alternates: {
    canonical: '/',
    // Add `en: '/en'` alongside this once the English page ships — declaring an
    // hreflang for a route that 404s hurts more than the missing pair does.
    languages: { he: '/' },
  },
  openGraph: {
    title: 'ממשקים | מענה קולי חכם AI לשירות לקוחות 24/7',
    description:
      'בוט קולי בעברית שמנהל שיחות שירות אמיתיות: קובע תורים, מברר, מעדכן — ומעביר לנציג רק כשבאמת צריך.',
    url: SITE_URL,
    siteName: 'ממשקים',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream font-sans text-navy antialiased">{children}</body>
    </html>
  );
}
