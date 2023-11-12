import { Module } from '@nestjs/common';
import { AuthModule, UsersModule } from './infrastructure/modules';
import { DatabaseDriver } from './infrastructure/services/db';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE}`,
      validationSchema: configValidationSchema,
    }),
    DatabaseDriver,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
