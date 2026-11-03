import Link from 'next/link';
import { COPY, DEMO_URL, LOGIN_URL } from './copy';
import { DashboardMock, CoachScreen, LogoMark } from './mocks';
import { AgentPhone, HearButton, Reveal, ScaledFrame, TrackedLink, V2CallProvider } from './client';

/*
 * v2 "Apple-clean, product-led" landing page.
 * Source of truth: design canvas 99vwZyveGSqJPeFSBE7vRD, project/Main.dc.html.
 */

const H2 = 'm-0 text-[clamp(40px,5.2vw,64px)] font-bold leading-[1.06] tracking-[-0.015em]';
const LEAD = 'mx-auto mt-3 max-w-[680px] text-[clamp(19px,2vw,26px)] leading-[1.4]';
const TEXT_LINK = 'v2-link text-[17px]';

function Chevron({ lang }) {
  // "‹" points forward in RTL; in LTR the forward chevron is "›".
  return <span aria-hidden="true">{lang === 'he' ? ' ‹' : ' ›'}</span>;
}

function DemoButton({ lang, location, children }) {
  return (
    <TrackedLink href={DEMO_URL} event="cta_demo_click" props={{ location, lang }} className="v2-btn">
      {children}
    </TrackedLink>
  );
}

export function V2Nav({ lang, home = false }) {
  const t = COPY[lang].nav;
  const prefix = home ? '' : lang === 'en' ? '/en' : '/';
  return (
    <header className="border-b border-[#E3E3E8] bg-site-gray">
      <nav aria-label={t.label} className="mx-auto flex h-12 max-w-[1100px] items-center justify-between gap-6 px-6">
        <a href={home ? '#top' : prefix} className="flex items-center gap-2 text-[18px] font-bold text-site-text no-underline hover:no-underline">
          <LogoMark />
          {COPY[lang].brand}
        </a>
        <div className="hidden gap-8 text-[13px] md:flex">
          {t.links.map((l) => (
            <a key={l.href} href={home ? l.href : `${prefix}${l.href}`} className="text-site-text">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5 text-[13px]">
          <a href={t.switchHref} hrefLang={t.switchLang} lang={t.switchLang} aria-label={t.switchAria} className="font-semibold text-site-text">
            {t.switchLabel}
          </a>
          <TrackedLink href={LOGIN_URL} event="login_click" props={{ lang }} className="text-site-text">
            {t.login}
          </TrackedLink>
        </div>
      </nav>
    </header>
  );
}

export function V2Footer({ lang }) {
  const t = COPY[lang].footer;
  const base = lang === 'en' ? '/en' : '/';
  return (
    <footer className="border-t border-[#E3E3E8] bg-site-gray p-6">
      <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-3 text-[12px] text-site-text2">
        <span>{t.copy}</span>
        <span className="flex flex-wrap gap-5">
          {t.links.map((l) =>
            l.href.startsWith('#') ? (
              <a key={l.href} href={`${base}${l.href}`} className="text-[#424245]">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="text-[#424245]">
                {l.label}
              </Link>
            )
          )}
        </span>
      </div>
    </footer>
  );
}

function Hero({ lang }) {
  const t = COPY[lang].hero;
  return (
    <section id="top" className="overflow-hidden px-6 pt-[88px] text-center">
      <p className="m-0 mb-[10px] text-[21px] font-semibold text-link">{t.eyebrow}</p>
      <h1 className="m-0 text-[clamp(48px,7vw,96px)] font-bold leading-[1.02] tracking-[-0.02em]">{t.title}</h1>
      <p className="mx-auto mt-4 max-w-[720px] text-[clamp(19px,2vw,26px)] leading-[1.4]">{t.sub}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-7">
        <DemoButton lang={lang} location="hero">{t.demo}</DemoButton>
        <HearButton lang={lang} location="hero" className={`${TEXT_LINK} v2-btn-link`}>
          {t.hear}
          <Chevron lang={lang} />
        </HearButton>
      </div>

      {/* Laptop */}
      <div className="relative mx-auto mt-16 max-w-[1240px] pb-10">
        <div className="relative mx-auto w-full max-w-[1152px] max-[760px]:max-w-[1136px]">
          <div className="relative rounded-[22px] bg-[#1C1C1E] px-4 pb-[18px] pt-[22px] shadow-[0_40px_80px_-20px_rgba(0,0,0,.25)] max-[760px]:rounded-[12px] max-[760px]:px-2 max-[760px]:pb-2 max-[760px]:pt-3">
            <div aria-hidden="true" className="absolute left-1/2 top-2 -ml-[3px] h-[6px] w-[6px] rounded-full bg-[#3A3A3D] max-[760px]:top-1" />
            <div className="overflow-hidden rounded-[6px] bg-[#F2F5F4]">
              <ScaledFrame width={1120} height={700} className="scaled-dash" role="img" aria-label={t.dashAria}>
                <div aria-hidden="true">
                  <DashboardMock lang={lang} />
                </div>
              </ScaledFrame>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-[-80px] h-5 rounded-b-[18px] rounded-t-[3px] bg-[linear-gradient(#DCDCE0,#B4B4B9)] max-[1240px]:mx-[-4%] max-[760px]:h-3">
            <div className="absolute left-1/2 top-0 -ml-[70px] h-[7px] w-[140px] rounded-b-[7px] bg-[#9E9EA4] max-[760px]:-ml-[40px] max-[760px]:h-1 max-[760px]:w-[80px]" />
          </div>

          {/* Action overlays (hidden below 760px) */}
          <Reveal
            delay={150}
            className="v2-ov absolute flex items-center gap-[10px] rounded-full bg-sidebar py-[10px] pe-[18px] ps-3 text-[15px] font-medium text-white shadow-[0_20px_48px_-8px_rgba(0,0,0,.25)]"
            style={{ top: '7%', insetInlineStart: 'var(--ov-start, -40px)' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
              <circle cx="14" cy="14" r="14" fill="#14A08B" />
              <path d="M19.5 17v1.6a1.1 1.1 0 0 1-1.2 1.1 10.8 10.8 0 0 1-4.7-1.7 10.6 10.6 0 0 1-3.3-3.3A10.8 10.8 0 0 1 8.6 9.9 1.1 1.1 0 0 1 9.7 8.7h1.6a1.1 1.1 0 0 1 1.1.9l.4 1.5a1.1 1.1 0 0 1-.3 1.1l-.7.7a8.7 8.7 0 0 0 3.3 3.3l.7-.7a1.1 1.1 0 0 1 1.1-.3l1.5.4a1.1 1.1 0 0 1 .9 1.1z" fill="#fff" />
            </svg>
            {t.ovCall}
            <span className="text-[13px] text-[#5FD3BE]">00:04</span>
          </Reveal>
          <Reveal
            delay={450}
            className="v2-ov absolute rounded-[10px] bg-orange px-[14px] py-2 text-[14px] font-medium text-white shadow-[0_16px_36px_-8px_rgba(194,80,31,.45)]"
            style={{ top: '26%', insetInlineEnd: '35%' }}
          >
            {t.ovTask}
          </Reveal>
          <Reveal
            delay={300}
            className="v2-ov absolute flex items-center gap-[14px] rounded-[18px] bg-white px-5 py-4 text-start shadow-[0_24px_56px_-10px_rgba(0,0,0,.22),0_2px_6px_rgba(0,0,0,.06)]"
            style={{ top: '40%', insetInlineEnd: 'var(--ov-end, -50px)' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="20" fill="#14A08B" />
              <path d="m13 20.5 5 5 9-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div className="text-[16px] font-semibold">{t.ovBookedTitle}</div>
              <div className="text-[14px] text-site-text2">{t.ovBookedSub}</div>
            </div>
            <span className="text-[12px] text-site-text2">{t.ovBookedTime}</span>
          </Reveal>
        </div>
        <p className="m-0 mt-[18px] text-[13px] text-site-text2">{t.caption}</p>
      </div>
    </section>
  );
}

function CoachTile({ lang }) {
  const t = COPY[lang].coach;
  return (
    <section id="coach" className="mt-16 overflow-hidden bg-site-gray px-6 pt-[88px] text-center">
      <p className="m-0 mb-2 text-[19px] font-semibold text-orange-text">{t.eyebrow}</p>
      <h2 className={H2}>{t.title}</h2>
      <p className={LEAD}>{t.sub}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-7">
        <TrackedLink href={DEMO_URL} event="cta_demo_click" props={{ location: 'coach', lang }} className={TEXT_LINK}>
          {t.link}
          <Chevron lang={lang} />
        </TrackedLink>
      </div>
      <div className="relative mx-auto mt-14 max-w-[1060px]">
        <div className="mx-auto w-full max-w-[1028px] rounded-t-[18px] bg-[#1C1C1E] px-[14px] pt-[14px] max-[760px]:rounded-t-[10px] max-[760px]:px-2 max-[760px]:pt-2">
          <div className="overflow-hidden rounded-t-[6px]">
            <ScaledFrame width={1000} height={580} className="scaled-coach" role="img" aria-label={t.aria}>
              <div aria-hidden="true">
                <CoachScreen lang={lang} />
              </div>
            </ScaledFrame>
          </div>
        </div>
        <Reveal
          delay={200}
          className="v2-ov absolute max-w-[280px] rounded-2xl bg-white px-[18px] py-[14px] text-start shadow-[0_24px_56px_-10px_rgba(0,0,0,.22)]"
          style={{ top: '43%', insetInlineEnd: 'var(--ov-end, -30px)' }}
        >
          <div className="text-[12px] font-semibold text-orange-text">{t.ovLabel}</div>
          <div className="mt-[2px] text-[15px] font-medium">{t.ovText}</div>
        </Reveal>
      </div>
    </section>
  );
}

function TwoUp({ lang }) {
  const a = COPY[lang].agent;
  const k = COPY[lang].tasks;
  const tile =
    'box-border flex min-h-[640px] flex-[1_1_520px] flex-col items-center overflow-hidden px-8 pt-16 text-center max-[760px]:min-h-0 max-[760px]:px-5 max-[760px]:pt-12';
  const tileH2 = 'm-0 text-[clamp(34px,3.4vw,44px)] font-bold leading-[1.1]';
  return (
    <section className="flex flex-wrap gap-3 bg-white p-3">
      <div id="agent" className={`${tile} scroll-mt-4 bg-site-gray`}>
        <p className="m-0 mb-[6px] text-[17px] font-semibold text-link">{a.eyebrow}</p>
        <h2 className={tileH2}>{a.title}</h2>
        <p className="m-0 mt-[10px] max-w-[420px] text-[19px]">{a.sub}</p>
        <HearButton lang={lang} location="agent_tile" className={`${TEXT_LINK} v2-btn-link mt-[14px]`}>
          {a.talk}
          <Chevron lang={lang} />
        </HearButton>
        <p className="m-0 mt-1 max-w-[360px] text-[13px] text-site-text2">{a.talkNote}</p>
        <AgentPhone lang={lang} />
      </div>

      <div id="tasks" className={`${tile} bg-sidebar text-white`}>
        <p className="m-0 mb-[6px] text-[17px] font-semibold text-[#5FD3BE]">{k.eyebrow}</p>
        <h2 className={tileH2}>{k.title}</h2>
        <p className="m-0 mt-[10px] max-w-[440px] text-[19px] text-[#D7E8E4]">{k.sub}</p>
        <div className="mt-10 box-border flex w-full max-w-[440px] flex-col gap-[10px] rounded-t-[20px] bg-white px-5 pb-[26px] pt-5 text-start text-[#12201E]">
          <div className="flex justify-between text-[14px]">
            <strong>{k.listTitle}</strong>
            <span className="text-[#5F6E6B]">{k.today}</span>
          </div>
          <div className="flex items-center gap-[10px] rounded-xl bg-teal-tint px-[13px] py-[11px]">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal text-[13px] text-white" aria-hidden="true">
              ✓
            </span>
            <span className="flex-grow text-[14px]">
              <span className="text-[#5F6E6B] line-through">{k.done[0]}</span>
              <br />
              <span className="text-[12px] font-medium text-link">{k.done[1]}</span>
            </span>
          </div>
          {k.open.map(([task, meta]) => (
            <div key={task} className="flex items-center gap-[10px] rounded-xl border border-[#E4EAE8] px-[13px] py-[11px]">
              <span className="box-border h-6 w-6 flex-none rounded-full border-2 border-[#C9D3D1]" aria-hidden="true" />
              <span className="flex-grow text-[14px]">
                {task}
                <br />
                <span className="text-[12px] text-[#5F6E6B]">{meta}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy({ lang }) {
  const t = COPY[lang].privacy;
  return (
    <section id="privacy" className="bg-black px-6 py-28 text-center text-[#F5F5F7]">
      <p className="m-0 mb-3 text-[17px] font-semibold text-[#5FD3BE]">{t.eyebrow}</p>
      <h2 className={H2}>{t.title}</h2>
      <p className="mx-auto mt-4 max-w-[700px] text-[clamp(18px,1.8vw,22px)] leading-[1.5] text-[#A1A1A6]">{t.sub}</p>
    </section>
  );
}

function FinalCta({ lang }) {
  const t = COPY[lang].cta;
  const h = COPY[lang].hero;
  return (
    <section id="demo" className="px-6 py-[120px] text-center">
      <h2 className={H2}>
        {t.title[0]}
        <br />
        {t.title[1]}
      </h2>
      <p className="mx-auto mt-4 text-[21px] text-site-text2">{t.sub}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-7">
        <DemoButton lang={lang} location="final_cta">{h.demo}</DemoButton>
        <HearButton lang={lang} location="final_cta" className={`${TEXT_LINK} v2-btn-link`}>
          {h.hear}
          <Chevron lang={lang} />
        </HearButton>
      </div>
    </section>
  );
}

export default function LandingV2({ lang = 'he' }) {
  return (
    <V2CallProvider lang={lang}>
      <div className="bg-white text-site-text antialiased">
        <V2Nav lang={lang} home />
        <main>
          <Hero lang={lang} />
          <CoachTile lang={lang} />
          <TwoUp lang={lang} />
          <Privacy lang={lang} />
          <FinalCta lang={lang} />
        </main>
        <V2Footer lang={lang} />
      </div>
    </V2CallProvider>
  );
}
