import { Module } from '@nestjs/common';
import { AuthModule, UsersModule } from './infrastructure/modules';
import { DatabaseDriver } from './infrastructure/services/db';
import { ConfigModule } from '@nestjs/config';
// import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.STAGE}.env`,
      // validationSchema: configValidationSchema,
    }),
    DatabaseDriver,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
