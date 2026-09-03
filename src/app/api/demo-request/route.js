import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REQUIRED = ['name', 'company', 'phone', 'email'];

/**
 * Demo requests land wherever the environment points them:
 *   DEMO_WEBHOOK_URL  — any inbox that accepts JSON (Make/Zapier/n8n/Slack).
 *   SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (+ optional DEMO_TABLE)
 *                     — inserted straight into Postgres via PostgREST.
 * Configure at least one. With neither, the route refuses the submission
 * rather than accepting a lead it cannot store.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const missing = REQUIRED.filter((f) => !String(body?.[f] || '').trim());
  if (missing.length) {
    return NextResponse.json({ error: `missing:${missing.join(',')}` }, { status: 400 });
  }
  if (!body.consent) {
    return NextResponse.json({ error: 'missing:consent' }, { status: 400 });
  }

  const lead = {
    name: String(body.name).trim().slice(0, 200),
    company: String(body.company).trim().slice(0, 200),
    phone: String(body.phone).trim().slice(0, 40),
    email: String(body.email).trim().slice(0, 200),
    industry: String(body.industry || '').trim().slice(0, 100) || null,
    notes: String(body.notes || '').trim().slice(0, 2000) || null,
    source: 'landing',
    created_at: new Date().toISOString(),
  };

  const sinks = [];
  if (process.env.DEMO_WEBHOOK_URL) sinks.push(sendToWebhook(lead));
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) sinks.push(sendToSupabase(lead));
  // Storing a lead nobody looks at is the same as losing it, so the Slack ping
  // rides alongside the durable write rather than replacing it.
  if (process.env.DEMO_SLACK_WEBHOOK_URL) sinks.push(sendToSlack(lead));

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

async function sendToWebhook(lead) {
  const res = await fetch(process.env.DEMO_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
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

async function sendToSupabase(lead) {
  const table = process.env.DEMO_TABLE || 'demo_requests';
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`);
}
