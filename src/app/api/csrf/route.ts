import { getUserFromRequest } from '@/infrastructure/auth/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  return NextResponse.json({ csrfToken: session.csrfToken }, { status: 200 });
}
