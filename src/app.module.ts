import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/modules';
import { DatabaseDriver } from './infrastructure/services/db';

@Module({
  imports: [DatabaseDriver, UsersModule],
})
export class AppModule {}
