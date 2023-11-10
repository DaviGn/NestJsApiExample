import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { ToListUserResponse } from 'src/domain/mapping/user';
import { ListUserResponse } from 'src/domain/responses/users/list';
import { Repository } from 'typeorm';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(): Promise<ListUserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((x) => ToListUserResponse(x));
  }
}
