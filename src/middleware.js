import { NextResponse } from 'next/server';

/**
 * Keeps the previous landing page in the air on its own subdomain.
 *
 * v1.mimshakim.com/*  ->  rewrites to /v1  (URL in the browser stays on the
 * subdomain; the page is served from this same deployment, so there is no
 * second Vercel project to keep in sync).
 *
 * Add `v1.mimshakim.com` as a domain on the Vercel project for this to resolve.
 */
const LEGACY_HOSTS = new Set(['v1.mimshakim.com', 'v1.localhost:3100']);

export function middleware(request) {
  const host = request.headers.get('host') || '';
  if (!LEGACY_HOSTS.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  if (url.pathname === '/' || !url.pathname.startsWith('/v1')) {
    url.pathname = `/v1${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next internals and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
};
