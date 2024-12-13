import { getSession } from '@/infrastructure/auth/session';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionId = req.cookies.get('sessionId')?.value;
  
  
  const protectedRoutes = ['/', '/edit'];
  const unprotectedRoutes = ['/signin', '/signup'];

  // Allow access to unprotected routes without checking for a sessionId
  if (sessionId && unprotectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If no sessionId is present and the user tries to access a protected route, redirect to /login
  if (!sessionId && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/edit/:path*',
    '/signin',
    '/signup',
  ],
};
