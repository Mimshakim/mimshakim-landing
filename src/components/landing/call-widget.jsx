'use client';

import { useCall } from './call-provider';

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || '/demo';

// Staggered .12s delays, matching the design's 8-bar waveform.
const BARS = [0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84];

export default function CallWidget() {
  const { phase, timer, muted, captions, notice, startCall, endCall, toggleMute } = useCall();

  return (
    <div className="relative flex flex-col justify-center bg-navy px-10 py-12 text-white">
      {phase === 'idle' && <IdleState onStart={startCall} notice={notice} />}
      {phase === 'connecting' && <ConnectingState />}
      {phase === 'live' && (
        <LiveState
          timer={timer}
          muted={muted}
          captions={captions}
          onToggleMute={toggleMute}
          onEnd={endCall}
        />
      )}
      {phase === 'ended' && <EndedState onStart={startCall} />}
    </div>
  );
}

function IdleState({ onStart, notice }) {
  return (
    <div className="flex flex-col items-center gap-[22px] text-center">
      <div className="text-[13px] font-extrabold tracking-[2px] text-brand-cyan-bright">
        נסו בעצמכם — שיחה חיה
      </div>
      <button
        type="button"
        onClick={onStart}
        aria-label="דברו עם הסוכן שלנו"
        className="flex h-[130px] w-[130px] animate-pulse-ring items-center justify-center rounded-full bg-[linear-gradient(135deg,#00E5FF,#248BD3)] text-[46px] leading-none transition-transform hover:scale-105"
      >
        🎙
      </button>
      <div className="text-[22px] font-extrabold">דברו עם הסוכן שלנו</div>
      <div className="max-w-[280px] text-[14.5px] leading-[1.6] text-brand-muted-dark">
        לחצו והתחילו שיחה קולית מהדפדפן. שאלו, קבעו תור, בררו — כמו לקוח אמיתי.
      </div>
      {notice ? (
        <div
          role="status"
          className="max-w-[280px] rounded-[4px] border border-brand-danger/60 bg-brand-danger/10 px-3 py-2 text-[13px] leading-[1.5] text-brand-caption-user"
        >
          {notice}
        </div>
      ) : null}
      <div className="text-[12px] text-brand-faint-dark">🔒 נדרש אישור מיקרופון · הפרטים שתמסרו ישמשו ליצירת קשר</div>
    </div>
  );
}

function ConnectingState() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="h-16 w-16 animate-spin-fast rounded-full border-4 border-[rgba(0,229,255,.2)] border-t-brand-cyan-bright" />
      <div className="text-[20px] font-extrabold">מתחברים לסוכן…</div>
      <div className="text-[14px] text-brand-muted-dark">מאשרים גישה למיקרופון ופותחים ערוץ קול</div>
    </div>
  );
}

function LiveState({ timer, muted, captions, onToggleMute, onEnd }) {
  return (
    <div className="flex h-full flex-col gap-[18px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <span className="h-[9px] w-[9px] animate-pulse-dot rounded-full bg-brand-success" />
          <span className="text-[13px] font-extrabold tracking-[1px] text-brand-success">שיחה פעילה</span>
        </div>
        <span className="text-[15px] font-bold tabular-nums text-brand-muted-dark">{timer}</span>
      </div>

      <div className="flex h-12 items-end justify-center gap-1" aria-hidden="true">
        {BARS.map((delay) => (
          <span
            key={delay}
            className="w-[6px] animate-wave rounded-[3px] bg-brand-cyan-bright"
            style={{ height: '100%', animationDelay: `${delay}s`, transformOrigin: 'bottom' }}
          />
        ))}
      </div>

      <div
        className="flex min-h-[150px] flex-1 flex-col justify-end gap-[9px] overflow-hidden"
        aria-live="polite"
      >
        {captions.map((cap, i) => (
          <div
            key={`${i}-${cap.text}`}
            className={[
              'max-w-[92%] rounded-[10px] px-[14px] py-[9px] text-[14.5px] leading-[1.55]',
              cap.who === 'agent'
                ? 'self-start bg-[rgba(0,229,255,.12)] text-brand-caption-agent'
                : 'self-end bg-[rgba(255,255,255,.08)] text-brand-caption-user',
            ].join(' ')}
          >
            {cap.text}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={onToggleMute}
          aria-pressed={muted}
          aria-label={muted ? 'ביטול השתקה' : 'השתקת מיקרופון'}
          className={[
            'flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[rgba(255,255,255,.25)] text-[20px] leading-none',
            muted ? 'bg-[rgba(229,72,77,.25)]' : 'bg-transparent',
          ].join(' ')}
        >
          {muted ? '🔇' : '🎙'}
        </button>
        <button
          type="button"
          onClick={onEnd}
          className="flex items-center gap-2 rounded-full bg-brand-danger px-8 py-[14px] text-[15px] font-extrabold text-white"
        >
          ✕ סיום שיחה
        </button>
      </div>
    </div>
  );
}

function EndedState({ onStart }) {
  return (
    <div className="flex flex-col items-center gap-[18px] text-center">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-brand-success bg-[rgba(43,224,128,.15)] text-[30px] text-brand-success">
        ✓
      </div>
      <div className="text-[22px] font-extrabold">כך נשמע הסוכן שלכם.</div>
      <div className="max-w-[280px] text-[14.5px] leading-[1.6] text-brand-muted-dark">
        רוצים אחד שמדבר בשפה של העסק שלכם? נבנה לכם אותו תוך ימים.
      </div>
      <a
        href={DEMO_URL}
        className="rounded-[4px] bg-brand-cyan px-8 py-[14px] text-[16px] font-black text-navy no-underline hover:text-navy"
      >
        קבעו הדגמה ←
      </a>
      <button
        type="button"
        onClick={onStart}
        className="text-[13.5px] text-brand-muted-dark underline"
      >
        שיחה נוספת
      </button>
    </div>
  );
}
