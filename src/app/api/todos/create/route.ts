import { CreateTodoUseCase } from '@/application/useCases/CreateTodoUseCase';
import { verifyCsrf } from '@/infrastructure/auth/csrf';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  if (!await verifyCsrf(req)) return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });

  const { content, dueDate } = await req.json();
  if (typeof content !== 'string' || !content.trim()) {
    return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
  }
  if (!dueDate || isNaN(Date.parse(dueDate))) {
    return NextResponse.json({ error: 'Invalid due date' }, { status: 400 });
  }

  const repo = new FileSystemTodoRepository();
  const useCase = new CreateTodoUseCase(repo);
  const newTodo = await useCase.execute(session.userId, content.trim(), new Date(dueDate));
  
  return NextResponse.json(newTodo, { status: 201 });
}
