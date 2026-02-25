import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  if (!process.env.TURSO_ADMIN_DB_URL) {
    return NextResponse.next();
  }

  // Dynamically import auth to avoid top-level initialization
  const { auth } = await import('@/auth');
  return (auth as any)(request);
}

export const config = {
  matcher: [
    // Match all routes except static files, images, and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
