import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { Todo } from "../../domain/entities/Todo";
import { v4 as uuidv4 } from 'uuid';

export class CreateTodoUseCase {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(userId: string, content: string, dueDate?: Date): Promise<Todo> {
    const newTodo: Todo = {
      id: uuidv4(),
      userId,
      content,
      dueDate,
      status: 'unfinished',
      createdAt: new Date()
    };
    await this.todoRepo.create(newTodo);
    return newTodo;
  }
}
