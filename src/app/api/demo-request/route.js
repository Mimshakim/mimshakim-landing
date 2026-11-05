import { NextResponse } from 'next/server';
import { validateLead } from '@/lib/demo-lead';

export const runtime = 'nodejs';

/**
 * Demo requests are relayed straight to whoever is going to answer them.
 *
 *   DEMO_SLACK_WEBHOOK_URL — a Slack incoming webhook (the usual sink).
 *   DEMO_WEBHOOK_URL       — any other JSON endpoint (Make / Zapier / n8n).
 *
 * Configure at least one. With neither, the route refuses the submission
 * rather than accepting a lead it cannot deliver — a visitor seeing an error
 * is recoverable; a lead silently dropped is not.
 *
 * Deliberately no database: this page's stack is GitHub -> Vercel -> domain,
 * and a public marketing page should not hold credentials to one.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  // Same rules as the form (src/lib/demo-lead.js), so a bypassed client can't send junk.
  const { errors, clean } = validateLead(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'invalid', fields: errors }, { status: 400 });
  }

  const lead = { ...clean, source: 'landing', created_at: new Date().toISOString() };

  const sinks = [];
  if (process.env.DEMO_SLACK_WEBHOOK_URL) sinks.push(sendToSlack(lead));
  if (process.env.DEMO_WEBHOOK_URL) sinks.push(sendToWebhook(lead));

  if (!sinks.length) {
    console.error('[demo-request] no sink configured; lead dropped', lead.email);
    return NextResponse.json({ error: 'not-configured' }, { status: 503 });
  }

  const results = await Promise.allSettled(sinks);
  if (results.every((r) => r.status === 'rejected')) {
    console.error('[demo-request] every sink failed', results);
    return NextResponse.json({ error: 'delivery-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

async function sendToSlack(lead) {
  const lines = [
    `*ליד חדש מהאתר* — ${lead.name}`,
    `חברה: ${lead.company}`,
    `טלפון: ${lead.phone}`,
    `אימייל: ${lead.email}`,
    lead.industry ? `תחום: ${lead.industry}` : null,
    lead.notes ? `הערות: ${lead.notes}` : null,
  ].filter(Boolean);

  const res = await fetch(process.env.DEMO_SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
  });
  if (!res.ok) throw new Error(`slack ${res.status}`);
}

async function sendToWebhook(lead) {
  const res = await fetch(process.env.DEMO_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}
