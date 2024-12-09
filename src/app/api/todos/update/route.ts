import { UpdateTodoUseCase } from '@/application/useCases/UpdateTodoUseCase';
import { Todo } from '@/domain/entities/Todo';
import { verifyCsrf } from '@/infrastructure/auth/csrf';
import { getUserFromRequest } from '@/infrastructure/auth/session';
import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  if (!await verifyCsrf(req)) return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 });

  const updatedTodo: Todo = await req.json();

  // Basic validation:
  if (typeof updatedTodo.id !== 'string' || !updatedTodo.id.trim()) {
    return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 });
  }
  if (typeof updatedTodo.content !== 'string' || !updatedTodo.content.trim()) {
    return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
  }
  if (!updatedTodo.dueDate || isNaN(new Date(updatedTodo.dueDate).getTime())) {
    return NextResponse.json({ error: 'Invalid due date' }, { status: 400 });
  }
  if (updatedTodo.status !== 'unfinished' && updatedTodo.status !== 'done') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const repo = new FileSystemTodoRepository();
  const useCase = new UpdateTodoUseCase(repo);

  try {
    await useCase.execute(session.userId, { ...updatedTodo, dueDate: new Date(updatedTodo.dueDate) });
    return NextResponse.json({ message: 'Todo updated' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
