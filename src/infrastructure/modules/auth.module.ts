import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/domain/entities/user';
import { SignInUseCase } from 'src/useCases/user/authenticate';
import { AuthController } from 'src/controllers/auth';
import { ChiperServiceName, CipherService } from '../services/cipher';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: ChiperServiceName,
      useClass: CipherService,
    },
    SignInUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
