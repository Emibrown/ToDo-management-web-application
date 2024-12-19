import fs from 'fs/promises';
import { DATA_PATH } from "../config";
import { Todo } from "@/domain/entities/Todo";
import { ITodoRepository } from '@/domain/repositories/ITodoRepository';

export class FileSystemTodoRepository implements ITodoRepository {
  private async readData(): Promise<Todo[]> {
    try {
      const data = await fs.readFile(DATA_PATH, 'utf-8');
      return JSON.parse(data).map((t: Todo) => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
        createdAt: new Date(t.createdAt)
      }));
    } catch (err) {
      return [];
    }
  }

  private async writeData(todos: Todo[]): Promise<void> {
    await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  }

  async getAllByUserId(userId: string): Promise<Todo[]> {
    const todos = await this.readData();
    return todos.filter(t => t.userId === userId);
  }

  async getById(id: string): Promise<Todo | null> {
    const todos = await this.readData();
    return todos.find(t => t.id === id) || null;
  }

  async create(todo: Todo): Promise<void> {
    const todos = await this.readData();
    todos.push(todo);
    await this.writeData(todos);
  }

  async update(updatedTodo: Todo): Promise<void> {
    let todos = await this.readData();
    todos = todos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    await this.writeData(todos);
  }

  async delete(id: string): Promise<void> {
    let todos = await this.readData();
    todos = todos.filter(t => t.id !== id);
    await this.writeData(todos);
  }
}
