import { NextRequest, NextResponse } from 'next/server';
import { createTodoSchema } from '../../schemas/schemas';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { verifyCsrf } from '@/infrastructure/auth/csrf';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { CreateTodoUseCase } from '@/application/useCases/CreateTodoUseCase';

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  if (!await verifyCsrf(req)) return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });

  const json = await req.json();
  const parsed = createTodoSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const { content, dueDate } = parsed.data;

  const repo = new FileSystemTodoRepository();
  const useCase = new CreateTodoUseCase(repo);
  const newTodo = await useCase.execute(session.userId, content.trim(), dueDate);

  return NextResponse.json(newTodo, { status: 201 });
}
