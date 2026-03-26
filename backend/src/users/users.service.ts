import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AppException } from 'src/common/error';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    const user = this.usersRepository.create(userData);

    try{
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating user with email ${userData.email}: ${error.message}`);
      throw new AppException('AUTH_USER_ALREADY_EXISTS');
    }
    
  }
}