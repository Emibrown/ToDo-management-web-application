import { DeleteTodoUseCase } from '@/application/useCases/DeleteTodoUseCase';
import { verifyCsrf } from '@/infrastructure/auth/csrf';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  if (!await verifyCsrf(req)) return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });

  const { id } = await req.json();
  if (typeof id !== 'string' || !id.trim()) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const repo = new FileSystemTodoRepository();
  const useCase = new DeleteTodoUseCase(repo);

  try {
    await useCase.execute(session.userId, id.trim());
    return NextResponse.json({ message: 'Todo deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
