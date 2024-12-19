import { GetTodosUseCase } from '@/application/useCases/GetTodosUseCase';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const repo = new FileSystemTodoRepository();
  const getTodosUseCase = new GetTodosUseCase(repo);
  const todos = await getTodosUseCase.execute(session.userId);
  return NextResponse.json(todos, { status: 200 });
}
