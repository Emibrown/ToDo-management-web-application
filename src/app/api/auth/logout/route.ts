import { clearSessionCookie, destroySession, getUserFromRequest } from '@/infrastructure/auth/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 200 });
  }

  const sessionId = req.cookies.get('sessionId')?.value;
  if (sessionId) {
    await destroySession(sessionId);
  }

  const res = NextResponse.json({ message: 'Logged out successfully' });
  clearSessionCookie(res);
  return res;
}
