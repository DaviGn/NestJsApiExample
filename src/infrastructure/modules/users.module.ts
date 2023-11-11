import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ChiperServiceName,
  CipherService,
} from 'src/infrastructure/services/cipher';
import { UsersController } from 'src/controllers/users';
import { User } from 'src/domain/entities/user';
import {
  GetUserUseCase,
  ListUsersUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/useCases/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: ChiperServiceName,
      useClass: CipherService,
    },
    ListUsersUseCase,
    GetUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
