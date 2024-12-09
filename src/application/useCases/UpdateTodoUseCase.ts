import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { Todo } from "../../domain/entities/Todo";

export class UpdateTodoUseCase {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(userId: string, updatedTodo: Todo): Promise<void> {
    const existing = await this.todoRepo.getById(updatedTodo.id);
    if (!existing || existing.userId !== userId) {
      throw new Error('Not authorized to update this todo.');
    }
    await this.todoRepo.update(updatedTodo);
  }
}
