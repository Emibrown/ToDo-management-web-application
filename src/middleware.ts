import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionId = req.cookies.get('sessionId')?.value;
  
  const protectedRoutes = ['/', '/edit'];
  const unprotectedRoutes = ['/signin', '/signup'];

  if (sessionId && unprotectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const isProtected = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (!sessionId && isProtected) {
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
