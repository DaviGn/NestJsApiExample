import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users';
import { User } from 'src/domain/entities/users';
import { CreateUserUseCase } from 'src/useCases/users/create';
import { ListUsersUseCase } from 'src/useCases/users/list';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ListUsersUseCase, CreateUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
