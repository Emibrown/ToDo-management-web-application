import { NextRequest } from 'next/server';
import { getUserFromRequest } from './session';

export async function verifyCsrf(req: NextRequest): Promise<boolean> {
  const session = await getUserFromRequest(req);
  if (!session) return false;

  const csrfToken = req.headers.get('x-csrf-token');
  return csrfToken === session.csrfToken;
}
