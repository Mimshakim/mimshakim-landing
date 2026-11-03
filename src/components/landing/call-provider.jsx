'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Call state for the whole page. The hero button, the widget mic and the
 * floating FAB all trigger the same start handler through this context.
 *
 * phase: 'idle' | 'connecting' | 'live' | 'ended'
 */
const CallContext = createContext(null);

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

const MAX_CAPTIONS = 4;

// Backstop: Vapi stays silent if the mic prompt is dismissed or the transport
// never opens, so we refuse to sit in 'connecting' indefinitely.
const CONNECT_TIMEOUT_MS = 20000;

// Hard ceiling on a single demo call. The Vapi org allows 10 concurrent calls
// shared with live clinic traffic, and a forgotten open tab holds a slot for as
// long as it is open. Three minutes is well past the point where a prospect has
// heard what the agent sounds like.
const MAX_CALL_MS = 3 * 60 * 1000;

const DEFAULT_MESSAGES = {
  notConfigured: 'השיחה החיה אינה מוגדרת כרגע. נסו שוב מאוחר יותר או קבעו הדגמה.',
  timeout: 'החיבור לסוכן לא הושלם. בדקו את החיבור לאינטרנט ונסו שוב.',
  maxDuration: 'שיחת ההדגמה מוגבלת ל־3 דקות. לשיחה מלאה — קבעו הדגמה.',
  mic: 'לא קיבלנו גישה למיקרופון. אשרו את ההרשאה בדפדפן ונסו שוב.',
  noDevice: 'לא נמצא מיקרופון זמין במכשיר.',
  generic: 'לא הצלחנו לפתוח את השיחה. נסו שוב בעוד רגע.',
};

/**
 * `messages` overrides the user-facing notices (the v2 English page passes its
 * own). `onCallStart` fires once per call that actually connects (analytics).
 */
export function CallProvider({ children, messages = DEFAULT_MESSAGES, onCallStart }) {
  const msgRef = useRef(messages);
  msgRef.current = messages;
  const onStartRef = useRef(onCallStart);
  onStartRef.current = onCallStart;

  const [phase, setPhase] = useState('idle');
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [notice, setNotice] = useState('');

  const vapiRef = useRef(null);
  const tickRef = useRef(null);
  const connectTimeoutRef = useRef(null);
  const maxDurationRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
    if (maxDurationRef.current) {
      clearTimeout(maxDurationRef.current);
      maxDurationRef.current = null;
    }
  }, []);

  // Lazily create the Vapi client on the browser and bind its events once.
  const getVapi = useCallback(async () => {
    if (vapiRef.current) return vapiRef.current;
    if (!PUBLIC_KEY) return null;

    const { default: Vapi } = await import('@vapi-ai/web');
    const vapi = new Vapi(PUBLIC_KEY);

    vapi.on('call-start', () => {
      setNotice('');
      setSeconds(0);
      setPhase('live');
      onStartRef.current?.();
      clearTimer();
      tickRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      maxDurationRef.current = setTimeout(() => {
        vapiRef.current?.stop();
        clearTimer();
        setPhase('ended');
        setNotice(msgRef.current.maxDuration);
      }, MAX_CALL_MS);
    });

    vapi.on('message', (m) => {
      if (m?.type === 'transcript' && m.transcriptType === 'final' && m.transcript) {
        setCaptions((prev) =>
          [...prev, { who: m.role === 'assistant' ? 'agent' : 'user', text: m.transcript }].slice(-MAX_CAPTIONS)
        );
      }
    });

    vapi.on('call-end', () => {
      clearTimer();
      setPhase((p) => (p === 'idle' ? p : 'ended'));
    });

    vapi.on('error', (err) => {
      clearTimer();
      setPhase('idle');
      setNotice(readableError(err, msgRef.current));
    });

    vapiRef.current = vapi;
    return vapi;
  }, [clearTimer]);

  const startCall = useCallback(async () => {
    if (phase === 'connecting' || phase === 'live') return;

    clearTimer();
    setCaptions([]);
    setSeconds(0);
    setMuted(false);
    setNotice('');

    if (!PUBLIC_KEY || !ASSISTANT_ID) {
      setNotice(msgRef.current.notConfigured);
      return;
    }

    setPhase('connecting');
    try {

      // Ask for the mic ourselves so a denial surfaces as a real error we can
      // explain — Vapi swallows it and would leave us connecting forever.
      const probe = await navigator.mediaDevices.getUserMedia({ audio: true });
      probe.getTracks().forEach((t) => t.stop());

      const vapi = await getVapi();
      if (!vapi) throw new Error('missing-key');

      connectTimeoutRef.current = setTimeout(() => {
        vapiRef.current?.stop();
        setPhase((p) => (p === 'connecting' ? 'idle' : p));
        setNotice(msgRef.current.timeout);
      }, CONNECT_TIMEOUT_MS);

      await vapi.start(ASSISTANT_ID);
    } catch (err) {
      clearTimer();
      setPhase('idle');
      setNotice(readableError(err, msgRef.current));
    }
  }, [phase, clearTimer, getVapi]);

  const endCall = useCallback(() => {
    clearTimer();
    setPhase('ended');
    vapiRef.current?.stop();
  }, [clearTimer]);

  const toggleMute = useCallback(() => {
    const next = !muted;
    vapiRef.current?.setMuted(next);
    setMuted(next);
  }, [muted]);

  // Stop the call and drop the timer if the page unmounts mid-conversation.
  useEffect(() => {
    return () => {
      clearTimer();
      vapiRef.current?.stop();
    };
  }, [clearTimer]);

  const value = useMemo(
    () => ({
      phase,
      seconds,
      timer: formatTimer(seconds),
      muted,
      captions,
      notice,
      showFab: phase === 'idle' || phase === 'ended',
      startCall,
      endCall,
      toggleMute,
    }),
    [phase, seconds, muted, captions, notice, startCall, endCall, toggleMute]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
}

export function useCall() {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCall must be used inside <CallProvider>');
  return ctx;
}

function formatTimer(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function readableError(err, m = DEFAULT_MESSAGES) {
  const raw =
    typeof err === 'string' ? err : `${err?.name || ''} ${err?.error?.message || err?.message || ''}`;
  if (/permission|denied|notallowed|dismissed/i.test(raw)) {
    return m.mic;
  }
  if (/notfound|notreadable|no.*device|overconstrained/i.test(raw)) {
    return m.noDevice;
  }
  return m.generic;
}
