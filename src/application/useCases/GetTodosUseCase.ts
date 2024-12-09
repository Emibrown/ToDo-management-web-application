import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { Todo } from "../../domain/entities/Todo";

export class GetTodosUseCase {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(userId: string): Promise<Todo[]> {
    return this.todoRepo.getAllByUserId(userId);
  }
}
