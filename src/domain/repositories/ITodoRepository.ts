import { Todo } from "../entities/Todo";

export interface ITodoRepository {
    getAllByUserId(userId: string): Promise<Todo[]>;
    getById(id: string): Promise<Todo | null>;
    create(todo: Todo): Promise<void>;
    update(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
}
