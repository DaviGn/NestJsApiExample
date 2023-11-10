import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users';
import { User } from 'src/domain/entities/users';
import { CreateUserUseCase } from 'src/useCases/users/create';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
