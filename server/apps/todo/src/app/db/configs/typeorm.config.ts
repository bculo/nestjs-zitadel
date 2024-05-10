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
  entities: [],
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/migrations/*.ts`],
});

console.log(`${__dirname}/migrations/*.ts`);
