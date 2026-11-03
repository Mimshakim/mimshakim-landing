import { COPY, VOLUME_BARS } from './copy';

/*
 * Device-screen mocks rebuilt from the real app (Main.dc.html, "v2 · Apple-clean").
 * They are drawn at a fixed size (dashboard 1120×700, coach 1000×580) and
 * scaled by <ScaledFrame>. All data is demo data.
 */

const BORDER = '1px solid #E4EAE8';
const MUTED = '#5F6E6B';
const card = { background: '#FFFFFF', border: BORDER, borderRadius: 13, padding: '14px 16px' };

export function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M9 6 2 14l7 8" stroke="#0E3B37" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m19 6 7 8-7 8" stroke="#14A08B" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14 9 4 5-4 5-4-5z" fill="#14A08B" />
    </svg>
  );
}

const NAV_ICONS = [
  <g key="0"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
  <g key="1"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="m8 12 3 3 5-6" /></g>,
  <path key="2" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
  <g key="3"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></g>,
  <path key="4" d="M6 20V12M12 20V4M18 20v-6" />,
  <g key="5"><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 8V4M9 14h.01M15 14h.01" /></g>,
  <g key="6"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z" /></g>,
  <g key="7"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></g>,
];

function Avatar({ text, urgent, size = 28 }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        background: urgent ? '#FCEDE6' : '#E2F3EF',
        color: urgent ? '#B2481B' : '#0F7A6A',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10.5,
      }}
    >
      {text}
    </span>
  );
}

export function DashboardMock({ lang }) {
  const t = COPY[lang].dash;
  return (
    <div
      style={{
        width: 1120,
        height: 700,
        display: 'flex',
        background: '#F2F5F4',
        fontSize: 12,
        color: '#12201E',
        textAlign: 'start',
        lineHeight: 1.35,
      }}
    >
      {/* sidebar */}
      <div
        style={{
          width: 190,
          flexShrink: 0,
          background: '#FFFFFF',
          borderInlineEnd: BORDER,
          padding: '18px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, fontSize: 17, padding: '0 4px 12px' }}>
          <LogoMark size={20} />
          {COPY[lang].brand}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: BORDER, borderRadius: 10, padding: '8px 9px', marginBottom: 10 }}>
          <span style={{ width: 26, height: 26, borderRadius: 7, background: '#0E3B37', color: '#FFFFFF', fontWeight: 700, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {t.clinicInitials}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 11.5, fontWeight: 600 }}>{t.clinic}</strong>
            <span style={{ fontSize: 10, color: MUTED }}>{t.role}</span>
          </span>
        </div>
        {t.nav.map((label, i) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '9px 10px',
              borderRadius: 9,
              fontSize: 12.5,
              ...(i === 0 ? { background: '#E2F3EF', color: '#0E3B37', fontWeight: 600 } : null),
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? '#14A08B' : MUTED} strokeWidth="2" aria-hidden="true">
              {NAV_ICONS[i]}
            </svg>
            {label}
            {i === 1 && (
              <span style={{ marginInlineStart: 'auto', background: '#FCEDE6', color: '#B2481B', borderRadius: 999, padding: '1px 7px', fontSize: 10, fontWeight: 600 }}>3</span>
            )}
          </div>
        ))}
        <div style={{ flexGrow: 1 }} />
        <div style={{ background: '#0E3B37', borderRadius: 12, padding: '11px 12px', color: '#FFFFFF' }}>
          <div style={{ fontSize: 10, color: '#B5D2CC' }}>{t.agentStatusLabel}</div>
          <div style={{ fontWeight: 700, fontSize: 12.5, margin: '2px 0' }}>{t.agentStatus}</div>
          <div style={{ fontSize: 10, color: '#B5D2CC' }}>{t.agentStatusSub}</div>
        </div>
      </div>

      {/* main */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ background: '#FFFFFF', borderBottom: BORDER, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 19 }}>{t.title}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{t.subtitle}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ border: BORDER, borderRadius: 8, padding: '7px 11px', color: MUTED, width: 150 }}>{t.search}</span>
            <span style={{ border: BORDER, borderRadius: 8, padding: '7px 11px', fontWeight: 500 }}>{t.range}</span>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#0E3B37', color: '#FFFFFF', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {t.userInitials}
            </span>
          </div>
        </div>

        <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
            {t.kpis.map((k) => {
              const dark = k.tone === 'dark';
              const warn = k.tone === 'warn';
              return (
                <div key={k.label} style={dark ? { background: '#0E3B37', borderRadius: 13, padding: '14px 16px', color: '#FFFFFF' } : card}>
                  <div style={{ color: dark ? '#B5D2CC' : warn ? '#B2481B' : MUTED, fontWeight: 500 }}>{k.label}</div>
                  <div style={{ fontSize: 27, fontWeight: 700, margin: '2px 0' }}>{k.value}</div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: dark ? '#5FD3BE' : warn ? '#B2481B' : k.tone === 'up' ? '#0F7A6A' : MUTED,
                      fontWeight: k.tone ? 500 : 400,
                    }}
                  >
                    {k.note}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 13.5 }}>{t.queueTitle}</strong>
                  <span style={{ color: '#0F7A6A', fontWeight: 500 }}>{t.queueAll}</span>
                </div>
                {t.queue.map((q) => (
                  <div
                    key={q.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      border: q.urgent ? '1.5px solid #C2501F' : BORDER,
                      background: q.urgent ? '#FFF8F4' : undefined,
                      borderRadius: 10,
                      padding: '9px 11px',
                    }}
                  >
                    <Avatar text={q.initials} urgent={q.urgent} />
                    <span style={{ flexGrow: 1 }}>
                      <strong style={{ fontWeight: 600, fontSize: 12.5 }}>{q.name}</strong>
                      <br />
                      <span style={{ color: MUTED, fontSize: 10.5 }}>{q.reason}</span>
                    </span>
                    <span style={{ color: MUTED, fontSize: 10 }}>{q.ago}</span>
                    <span
                      style={{
                        background: q.urgent ? '#FCEDE6' : '#F2F5F4',
                        color: q.urgent ? '#B2481B' : MUTED,
                        borderRadius: 999,
                        padding: '2px 8px',
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {q.tag}
                    </span>
                    <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#14A08B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                      ↩
                    </span>
                  </div>
                ))}
              </div>

              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 13.5 }}>{t.volumeTitle}</strong>
                  <span style={{ color: MUTED, fontSize: 10 }}>
                    <span style={{ color: '#14A08B' }}>■</span> {t.volumeIn} &nbsp; <span style={{ color: '#0E3B37' }}>■</span> {t.volumeOut}
                  </span>
                </div>
                <div style={{ color: MUTED, fontSize: 10.5, marginTop: 2 }}>{t.volumeRange}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 150, marginTop: 10, gap: 8 }}>
                  {VOLUME_BARS.map(([after, inHours], i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: after, background: '#0E3B37', borderRadius: '3px 3px 0 0' }} />
                      <div style={{ height: inHours, background: '#14A08B', marginTop: 2, borderRadius: '0 0 3px 3px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ width: 330, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 7 }}>
                <strong style={{ fontSize: 13.5 }}>{t.afterTitle}</strong>
                <span style={{ color: MUTED, fontSize: 10.5 }}>{t.afterSub}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 30, fontWeight: 700, color: '#0F7A6A' }}>{t.afterCount}</span>
                  <span>{t.afterCountLabel}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: '#14A08B' }} />
                <span style={{ color: MUTED, fontSize: 10 }}>{t.afterAll}</span>
                {t.afterRows.map(([label, value, warn]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{label}</span>
                    <strong style={warn ? { color: '#B2481B' } : undefined}>{value}</strong>
                  </div>
                ))}
              </div>
              <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <strong style={{ fontSize: 13.5 }}>{t.reasonsTitle}</strong>
                {t.reasons.map(([label, n, pct]) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{label}</span>
                      <span style={{ color: MUTED }}>{n}</span>
                    </div>
                    <div style={{ height: 6, background: '#F2F5F4', borderRadius: 999, marginTop: 4 }}>
                      <div style={{ width: `${pct}%`, height: 6, background: '#0E3B37', borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoachScreen({ lang }) {
  const t = COPY[lang].coach;
  const pill = { borderRadius: 7, padding: '5px 13px', fontWeight: 600 };
  return (
    <div
      style={{
        width: 1000,
        height: 580,
        background: '#F2F5F4',
        color: '#12201E',
        textAlign: 'start',
        fontSize: 12.5,
        lineHeight: 1.35,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ background: '#0E3B37', color: '#FFFFFF', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <strong style={{ fontSize: 14 }}>{t.callWith}</strong>
          <span style={{ color: '#B5D2CC' }} dir="ltr">{t.phone}</span>
          <strong style={{ color: '#5FD3BE' }}>{t.time}</strong>
        </span>
        <span style={{ display: 'flex', gap: 8 }}>
          <span style={{ ...pill, background: '#FFFFFF', color: '#12201E' }}>{t.mute}</span>
          <span style={{ ...pill, background: '#C2501F', color: '#FFFFFF' }}>{t.hangup}</span>
        </span>
      </div>
      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 21 }}>{t.screenTitle}</div>
          <div style={{ color: MUTED, fontSize: 11.5 }}>{t.screenSub}</div>
        </div>
        <div style={{ ...card, padding: '11px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ color: '#0F7A6A', fontWeight: 600 }}>{t.active}</span>
            <strong style={{ fontSize: 18 }}>{t.time}</strong>
            <span style={{ background: '#F2F5F4', color: MUTED, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{t.callType}</span>
          </span>
          <span style={{ color: MUTED }}>{t.patientMeta}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ ...card, padding: '13px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 14 }}>{t.coverage}</strong>
                <span style={{ color: MUTED, fontSize: 11 }}>{t.coverageCount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
                <strong style={{ fontSize: 24 }}>67%</strong>
                <div style={{ flexGrow: 1, height: 7, background: '#F2F5F4', borderRadius: 999 }}>
                  <div style={{ width: '67%', height: 7, background: '#14A08B', borderRadius: 999 }} />
                </div>
              </div>
            </div>
            <div style={{ background: '#FCEDE6', border: '1.5px solid #C2501F', borderRadius: 13, padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 14 }}>{t.notSaid}</strong>
                <span style={{ background: '#FFFFFF', borderRadius: 999, padding: '1px 9px', color: MUTED, fontSize: 11 }}>2</span>
              </div>
              {t.todo.map(([item, line]) => (
                <div key={item} style={{ background: '#FFFFFF', borderRadius: 10, padding: '9px 12px' }}>
                  <strong style={{ fontWeight: 600 }}>● {item}</strong>
                  <div style={{ color: MUTED, fontSize: 11 }}>{line}</div>
                </div>
              ))}
            </div>
            <div style={{ ...card, padding: '13px 18px', display: 'flex', flexDirection: 'column', gap: 5, color: '#0F7A6A' }}>
              <strong style={{ fontSize: 14, color: '#12201E' }}>{t.doneTitle}</strong>
              {t.done.map((d) => (
                <span key={d}>✓ {d}</span>
              ))}
            </div>
          </div>
          <div style={{ ...card, width: 360, flexShrink: 0, padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ fontSize: 14 }}>{t.captionsTitle}</strong>
            {t.lines.map(([who, text], i) => (
              <div key={i} style={{ background: who === 's' ? '#E2F3EF' : '#F2F5F4', borderRadius: 10, padding: '8px 11px' }}>
                <div style={{ color: who === 's' ? '#0F7A6A' : MUTED, fontSize: 10.5, fontWeight: 600 }}>
                  {who === 's' ? t.secretary : t.patient}
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
