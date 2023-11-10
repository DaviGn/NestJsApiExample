import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users';
import { ToCreateUserResponse } from 'src/domain/mapping/user';
import { CreateUserRequest } from 'src/domain/requests/users/create';
import { CreateUserResponse } from 'src/domain/responses/users/create';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = this.userRepository.create({
      name,
      email,
      password,
    });

    const entity = await this.userRepository.save(user);
    return ToCreateUserResponse(entity);
  }
}
