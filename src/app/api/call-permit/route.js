import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Gate in front of the public "talk to the agent" button.
 *
 * The Vapi org concurrency limit is 10 simultaneous calls, shared with live
 * clinic traffic. An unthrottled dial button on a public marketing page can
 * exhaust that, so every call attempt has to claim a slot here first.
 *
 * Visitor IPs are never stored in the clear — only a salted SHA-256 of the
 * address, which counts attempts without identifying anyone.
 *
 * Fails OPEN: if the limiter itself is misconfigured or Supabase is
 * unreachable, we let the call through rather than breaking the page's single
 * most important interaction over an infrastructure problem.
 */
const MAX_ATTEMPTS = Number(process.env.DEMO_CALL_MAX_PER_HOUR || 3);
const WINDOW_MINUTES = Number(process.env.DEMO_CALL_WINDOW_MINUTES || 60);

export async function POST(request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('[call-permit] limiter not configured; allowing call');
    return NextResponse.json({ ok: true, limited: false });
  }

  const ipHash = hashIp(request);

  try {
    const res = await fetch(`${url}/rest/v1/rpc/claim_demo_call_slot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        p_ip_hash: ipHash,
        p_max_attempts: MAX_ATTEMPTS,
        p_window_minutes: WINDOW_MINUTES,
      }),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`rpc ${res.status}: ${await res.text()}`);

    // PostgREST returns a set-returning function as an array of rows.
    const payload = await res.json();
    const row = Array.isArray(payload) ? payload[0] : payload;

    if (row?.allowed === false) {
      const minutes = Math.max(1, Math.ceil((row.retry_after_seconds || 0) / 60));
      return NextResponse.json(
        {
          ok: false,
          reason: 'rate-limited',
          retryAfterSeconds: row.retry_after_seconds || 0,
          message: `הגעתם למכסת שיחות ההדגמה לשעה. אפשר לנסות שוב בעוד כ־${minutes} דק׳, או לקבוע הדגמה מלאה.`,
        },
        { status: 429 }
      );
    }

    return NextResponse.json({ ok: true, limited: true, attempts: row?.attempts_in_window ?? null });
  } catch (err) {
    console.error('[call-permit] limiter failed, allowing call:', err?.message || err);
    return NextResponse.json({ ok: true, limited: false });
  }
}

function hashIp(request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
  const salt = process.env.DEMO_CALL_IP_SALT || 'mimshakim-demo-call';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}
