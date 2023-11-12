import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/domain/entities/user';
import { SignInUseCase } from 'src/useCases/user/authenticate';
import { AuthController } from 'src/controllers/auth';
import { ChiperServiceName, CipherService } from '../services/cipher';
import { JwtServiceModule } from '../services/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../services/guards';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtServiceModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: ChiperServiceName,
      useClass: CipherService,
    },
    SignInUseCase,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
