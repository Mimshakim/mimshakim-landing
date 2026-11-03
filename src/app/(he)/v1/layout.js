/**
 * The v1 (previous) landing page, kept in the air on its own subdomain.
 *
 * It is a verbatim copy of what production serves today, so it still expects
 * the old typography: the live root layout loaded Heebo and set it on <body>.
 * The new root layout ships Rubik, so restore Heebo for this route only —
 * including the `.font-sans` override, which the page markup relies on.
 */
export const metadata = {
  title: 'ממשקים — סוכני AI קוליים למרפאות',
  description:
    'סוכני AI חכמים שמנהלים את התורים, עונים ללקוחות ומסנכרנים הכל ישירות ליומן. המהפכה הקולית של המרפאה שלך.',
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`.font-sans{font-family:'Heebo',sans-serif}`}</style>
      <div style={{ fontFamily: "'Heebo', sans-serif" }}>{children}</div>
    </>
  );
}
