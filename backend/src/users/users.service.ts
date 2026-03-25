import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = {
      id: Date.now(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
