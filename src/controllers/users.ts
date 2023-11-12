import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserRequest, UpdateUserRequest } from 'src/domain/requests/user';
import {
  GetUserResponse,
  ListUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
} from 'src/domain/responses/user';
import {
  ListUsersUseCase,
  GetUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/useCases/user';

@Controller('users')
export class UsersController {
  constructor(
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard())
  async list(): Promise<ListUserResponse[]> {
    const result = await this.listUsersUseCase.run();
    return result;
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async get(@Param('id') id: string): Promise<GetUserResponse> {
    const result = await this.getUserUseCase.run(id);
    return result;
  }

  @Post('/')
  @HttpCode(201)
  async post(@Body() body: CreateUserRequest): Promise<CreateUserResponse> {
    const result = await this.createUserUseCase.run(body);
    return result;
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async put(
    @Param('id') id: string,
    @Body() body: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const result = await this.updateUserUseCase.run(id, body);
    return result;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.run(id);
  }
}
