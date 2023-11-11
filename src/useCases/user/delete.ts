import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(id: string): Promise<void> {
    const query = this.userRepository.createQueryBuilder();
    const result = await query.delete().where('id = :id', { id }).execute();

    if (!result.affected)
      throw new NotFoundException({
        message: 'User not found',
      });
  }
}
