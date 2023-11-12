import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { ToGetUserResponse } from 'src/domain/mapping/user';
import { SignInRequest } from 'src/domain/requests/auth';
import { SignInResponse } from 'src/domain/responses/auth';
import {
  ChiperServiceName,
  ICipherService,
} from 'src/infrastructure/services/cipher';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/domain/interfaces/jwt';

@Injectable()
export class SignInUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(ChiperServiceName)
    private readonly cipherService: ICipherService,
    private readonly jwtService: JwtService,
  ) {}

  async run({ email, password }: SignInRequest): Promise<SignInResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException();

    const passwordValid = await this.cipherService.validate(
      password,
      user.password,
    );

    if (!passwordValid) throw new UnauthorizedException();

    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken: string = await this.jwtService.sign(payload);

    return {
      token: accessToken,
      user: ToGetUserResponse(user),
    };
  }
}
