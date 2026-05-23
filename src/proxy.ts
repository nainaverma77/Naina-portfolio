import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');

  // If the user is not authenticated and trying to access the dashboard
  if (!adminToken && request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
