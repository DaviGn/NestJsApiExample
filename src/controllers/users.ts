import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from 'src/domain/requests/users/create';
import { CreateUserResponse } from 'src/domain/responses/users/create';
import { CreateUserUseCase } from 'src/useCases/users/create';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async post(@Body() body: CreateUserRequest): Promise<CreateUserResponse> {
    const result = await this.createUserUseCase.run(body);
    return result;
  }
}
