import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { ToGetUserResponse } from 'src/domain/mapping/user';
import { GetUserResponse } from 'src/domain/responses/user';
import { Repository } from 'typeorm';

@Injectable()
export class GetUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(id: string): Promise<GetUserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user)
      throw new NotFoundException({
        message: 'User not found!',
      });

    return ToGetUserResponse(user);
  }
}
