import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // API routes for authentication
  const isAuthRoute = pathname.startsWith('/api/auth');

  // Static files and assets
  const isStaticFile = pathname.startsWith('/_next') ||
                       pathname.startsWith('/favicon') ||
                       pathname.includes('.');

  // Allow static files
  if (isStaticFile) {
    return NextResponse.next();
  }

  // Allow API auth routes
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  const isLoggedIn = !!token;

  // Allow public routes
  if (isPublicRoute) {
    // If logged in and trying to access login page, redirect to dashboard
    if (isLoggedIn && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
