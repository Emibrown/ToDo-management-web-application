import { FileSystemTodoRepository } from '@/infrastructure/repositories/FileSystemTodoRepository';
import { NextRequest, NextResponse } from 'next/server';

const repo = new FileSystemTodoRepository();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const todo = await repo.getById(id);
    if (!todo) {
      return NextResponse.json({ error: 'To-Do not found' }, { status: 404 });
    }
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch to-do' }, { status: 500 });
  }
}
