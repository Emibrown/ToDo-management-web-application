import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from "@/infrastructure/auth/bcrypt";
import { User } from "@/domain/entities/User";
import { IUserRepository } from '@/domain/repositories/IUserRepository';

export class SignUpUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(username: string, password: string): Promise<User> {
    const normalizedUsername = username.toLowerCase().trim();
    const existing = await this.userRepo.findByUsername(normalizedUsername);
    if (existing) {
      throw new Error('Username already taken');
    }

    const passwordHash = await hashPassword(password);
    const newUser: User = {
      id: uuidv4(),
      username: normalizedUsername,
      passwordHash,
      createdAt: new Date(),
    };

    await this.userRepo.create(newUser);
    return newUser;
  }
}
