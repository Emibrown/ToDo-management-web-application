import { verifyCsrf } from '@/infrastructure/auth/csrf';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { deleteTodoSchema } from '../../schemas/schemas';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { DeleteTodoUseCase } from '@/application/useCases/DeleteTodoUseCase';

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  if (!await verifyCsrf(req)) return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });

  const json = await req.json();
  const parsed = deleteTodoSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const { id } = parsed.data;

  const repo = new FileSystemTodoRepository();
  const useCase = new DeleteTodoUseCase(repo);

  // Ensure the todo belongs to the user
  const existingTodo = await repo.getById(id);
  if (!existingTodo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  if (existingTodo.userId !== session.userId) {
    return NextResponse.json({ error: 'Not authorized to delete this todo' }, { status: 403 });
  }

  await useCase.execute(session.userId, id.trim());
  return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
}
