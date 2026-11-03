'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { CallProvider, useCall } from '@/components/landing/call-provider';
import { COPY } from './copy';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Fire-and-forget analytics. Never let tracking break a click. */
export function trackEvent(name, props) {
  try {
    track(name, props);
  } catch {
    /* analytics is best-effort */
  }
}

/** The shared Vapi call state, with notices in the page language. */
export function V2CallProvider({ lang, children }) {
  return (
    <CallProvider messages={COPY[lang].call} onCallStart={() => trackEvent('demo_call_connected', { lang })}>
      {children}
    </CallProvider>
  );
}

/** A plain link that records which CTA was clicked. */
export function TrackedLink({ event, props, children, ...rest }) {
  return (
    <a {...rest} onClick={() => trackEvent(event, props)}>
      {children}
    </a>
  );
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * "Hear the agent answer": scrolls to the voice-agent tile, where the phone
 * mock turns into the live call, and starts the browser demo call.
 */
export function HearButton({ lang, location, className, style, children }) {
  const { startCall, phase } = useCall();
  return (
    <button
      type="button"
      className={className}
      style={style}
      disabled={phase === 'connecting'}
      onClick={() => {
        trackEvent('hear_agent_click', { location, lang });
        if (location !== 'agent_tile') {
          document.getElementById('agent')?.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start',
          });
        }
        startCall();
      }}
    >
      {children}
    </button>
  );
}

/**
 * Fades and slides its content in the first time it scrolls into view.
 * Hidden-until-visible only applies when JS runs (`html.js`), and
 * prefers-reduced-motion skips the motion entirely (see globals.css).
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={`${className} ${inView ? 'is-in' : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Renders a fixed-size mock (e.g. the 1120×700 dashboard) and scales it to fit
 * its container with transform: scale(), inside an aspect-ratio box so the
 * layout never shifts. Before hydration, globals.css sets a breakpoint-based
 * --s so the server render is already close.
 */
export function ScaledFrame({ width, height, className = '', children, ...rest }) {
  const outer = useRef(null);
  const [scale, setScale] = useState(null);

  useIsoLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={outer}
      className={`scaled-frame ${className}`}
      style={{ width: '100%', maxWidth: width, aspectRatio: `${width} / ${height}`, position: 'relative', overflow: 'hidden' }}
    >
      <div
        {...rest}
        style={{
          width,
          height,
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          transform: `scale(${scale ?? 'var(--s, 1)'})`,
          transformOrigin: 'top var(--origin-x, right)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** The phone in the voice-agent tile: a sample conversation, or the live demo call. */
export function AgentPhone({ lang }) {
  const t = COPY[lang].agent;
  const { phase, timer, muted, captions, notice, endCall, toggleMute } = useCall();
  const live = phase === 'connecting' || phase === 'live';

  const bubble = (who, text, key) => (
    <div
      key={key}
      style={{
        background: who === 'a' || who === 'agent' ? '#E2F3EF' : '#F5F5F7',
        borderRadius: 14,
        padding: '9px 12px',
        fontSize: 13,
        lineHeight: 1.45,
      }}
    >
      {text}
    </div>
  );

  return (
    <>
      <div
        style={{
          marginTop: 40,
          width: 300,
          maxWidth: '100%',
          background: '#1C1C1E',
          borderRadius: '44px 44px 0 0',
          padding: '12px 12px 0',
          boxSizing: 'border-box',
        }}
      >
        <div
          aria-live="polite"
          style={{
            background: '#FFFFFF',
            borderRadius: '34px 34px 0 0',
            padding: '30px 18px 24px',
            textAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            minHeight: 300,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#6E6E73' }}>{live ? t.liveTitle : t.incoming}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{t.clinic}</div>
            <div style={{ fontSize: 12, color: '#0F7A6A', fontWeight: 500 }}>
              {phase === 'connecting' ? t.connecting : phase === 'live' ? `● ${timer}` : t.answering}
            </div>
          </div>

          {!live && phase !== 'ended' && (
            <>
              {t.lines.map(([who, text], i) => bubble(who, text, i))}
              <div
                style={{
                  alignSelf: 'center',
                  background: '#0F7A6A',
                  color: '#FFFFFF',
                  borderRadius: 999,
                  padding: '7px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {t.booked}
              </div>
            </>
          )}

          {phase === 'live' && (
            <>
              {captions.length === 0 ? (
                <p style={{ margin: 0, fontSize: 13, color: '#6E6E73', textAlign: 'center' }}>{t.listening}</p>
              ) : (
                captions.map((c, i) => bubble(c.who, c.text, i))
              )}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 'auto' }}>
                <button type="button" onClick={toggleMute} className="v2-phone-btn" aria-pressed={muted}>
                  {muted ? t.unmute : t.mute}
                </button>
                <button type="button" onClick={endCall} className="v2-phone-btn v2-phone-btn--end">
                  {t.end}
                </button>
              </div>
            </>
          )}

          {phase === 'connecting' && (
            <div aria-hidden="true" style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 24 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="v2-dot" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}

          {phase === 'ended' && (
            <p style={{ margin: '24px 0 0', fontSize: 14, textAlign: 'center' }}>{t.ended}</p>
          )}
        </div>
      </div>
      {notice && (
        <p role="alert" style={{ margin: '12px 0 0', maxWidth: 320, fontSize: 13, color: '#B2481B' }}>
          {notice}
        </p>
      )}
    </>
  );
}
