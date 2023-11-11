import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequest } from 'src/domain/requests/auth';
import { SignInUseCase } from 'src/useCases/user/authenticate';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/')
  async authenticate(@Body() body: SignInRequest) {
    const result = await this.signInUseCase.run(body);
    return result;
  }
}
