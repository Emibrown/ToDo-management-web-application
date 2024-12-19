import { Todo } from "@/domain/entities/Todo";
import { ITodoRepository } from "@/domain/repositories/ITodoRepository";

export class GetTodosUseCase {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(userId: string): Promise<Todo[]> {
    return this.todoRepo.getAllByUserId(userId);
  }
}
