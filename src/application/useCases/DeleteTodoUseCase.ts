import { ITodoRepository } from "@/domain/repositories/ITodoRepository";

export class DeleteTodoUseCase {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(userId: string, todoId: string): Promise<void> {
    const existing = await this.todoRepo.getById(todoId);
    if (!existing || existing.userId !== userId) {
      throw new Error('Not authorized to delete this todo.');
    }
    await this.todoRepo.delete(todoId);
  }
}
