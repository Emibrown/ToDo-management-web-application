import { verifyCsrf } from '@/infrastructure/auth/csrf';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { updateTodoSchema } from '../../schemas/schemas';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { UpdateTodoUseCase } from '@/application/useCases/UpdateTodoUseCase';

const repo = new FileSystemTodoRepository();

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  if (!await verifyCsrf(req)) return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });

  const json = await req.json();
  const parsed = updateTodoSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const { id, content, dueDate, status } = parsed.data;

  const repo = new FileSystemTodoRepository();
  const useCase = new UpdateTodoUseCase(repo);

  // Ensure the todo belongs to the user
  const existingTodo = await repo.getById(id);
  if (!existingTodo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  if (existingTodo.userId !== session.userId) {
    return NextResponse.json({ error: 'Not authorized to update this todo' }, { status: 403 });
  }

  const updatedTodo = {
    ...existingTodo,
    ...(content !== undefined ? { content: content.trim() } : {}),
    ...(dueDate !== undefined ? { dueDate } : { dueDate: undefined }),
    ...(status !== undefined ? { status } : {})
  };

  await useCase.execute(session.userId, updatedTodo);
  return NextResponse.json(updatedTodo, { status: 200 });
}
