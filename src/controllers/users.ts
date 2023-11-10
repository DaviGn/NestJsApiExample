import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserRequest } from 'src/domain/requests/users/create';
import { CreateUserResponse } from 'src/domain/responses/users/create';
import { ListUserResponse } from 'src/domain/responses/users/list';
import { CreateUserUseCase } from 'src/useCases/users/create';
import { ListUsersUseCase } from 'src/useCases/users/list';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Get('/')
  async get(): Promise<ListUserResponse[]> {
    const result = await this.listUsersUseCase.run();
    return result;
  }

  @Post('/')
  async post(@Body() body: CreateUserRequest): Promise<CreateUserResponse> {
    const result = await this.createUserUseCase.run(body);
    return result;
  }
}
