import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { ToUpdateUserResponse } from 'src/domain/mapping/user';
import { UpdateUserRequest } from 'src/domain/requests/user';
import { UpdateUserResponse } from 'src/domain/responses/user';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(
    id: string,
    { name, email, password }: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const query = this.userRepository.createQueryBuilder();
    const result = await query
      .update()
      .set({
        name,
        email,
        password,
      })
      .where('id = :id', { id })
      .execute();

    if (!result.affected)
      throw new NotFoundException({
        message: 'User not found',
      });

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return ToUpdateUserResponse(user);
  }
}
