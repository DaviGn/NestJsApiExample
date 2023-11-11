import { TypeOrmModule } from '@nestjs/typeorm';

const DatabaseDriver = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'nestjsexample',
  autoLoadEntities: true,
  synchronize: true,
});

export { DatabaseDriver };
