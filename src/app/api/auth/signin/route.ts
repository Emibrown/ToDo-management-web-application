import { SignInUseCase } from '@/application/useCases/SignInUseCase';
import { createSession, setSessionCookie } from '@/infrastructure/auth/session';
import { FileSystemUserRepository } from '@/infrastructure/repositories/FileSystemUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (typeof username !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const repo = new FileSystemUserRepository();
  const useCase = new SignInUseCase(repo);

  try {
    const user = await useCase.execute(username.trim(), password);
    const { sessionId, csrfToken } = await createSession(user.id);

    const res = NextResponse.json({ message: 'Signed in', csrfToken });
    setSessionCookie(res, sessionId);
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
