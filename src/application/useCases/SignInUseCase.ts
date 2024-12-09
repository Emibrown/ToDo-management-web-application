import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { verifyPassword } from "../../infrastructure/auth/bcrypt";
import { User } from "../../domain/entities/User";

export class SignInUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
