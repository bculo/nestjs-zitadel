import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_DATABASE'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  entities: ['libs/db/src/lib/*.entity.ts'],
  synchronize: false,
  logging: true,
  migrationsTableName: 'migrations',
  migrations: ['libs/db/src/lib/migrations/*.ts'],
});
