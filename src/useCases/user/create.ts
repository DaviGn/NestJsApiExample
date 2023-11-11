import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { ToCreateUserResponse } from 'src/domain/mapping/user';
import { CreateUserRequest } from 'src/domain/requests/user';
import { CreateUserResponse } from 'src/domain/responses/user';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import {
  ChiperServiceName,
  ICipherService,
} from 'src/infrastructure/services/cipher';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(ChiperServiceName)
    private readonly cipherService: ICipherService,
  ) {}

  async run({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const hashedPassword = await this.cipherService.encrypt(password);

    const user = this.userRepository.create({
      id: uuid(),
      name,
      email,
      password: hashedPassword,
    });

    const entity = await this.userRepository.save(user);
    return ToCreateUserResponse(entity);
  }
}
