import fs from 'fs/promises';
import { DATA_PATH_USERS } from '../config';
import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

export class FileSystemUserRepository implements IUserRepository {
  private async readData(): Promise<User[]> {
    try {
      const data = await fs.readFile(DATA_PATH_USERS, 'utf-8');
      return JSON.parse(data).map((u: any) => ({ ...u, createdAt: new Date(u.createdAt) }));
    } catch {
      return [];
    }
  }

  private async writeData(users: User[]): Promise<void> {
    await fs.writeFile(DATA_PATH_USERS, JSON.stringify(users, null, 2), 'utf-8');
  }

  async findByUsername(username: string): Promise<User | null> {
    const users = await this.readData();
    return users.find(u => u.username === username) || null;
  }

  async create(user: User): Promise<void> {
    const users = await this.readData();
    users.push(user);
    await this.writeData(users);
  }
}
