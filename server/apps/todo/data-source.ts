import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  entities: ['apps/todo/src/app/db/*.entity.ts'],
  synchronize: false,
  logging: true,
  migrationsTableName: 'migrations',
  migrations: ['apps/todo/src/app/db/migrations/*.ts'],
});
