import { TodoListEntity } from './todo-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TodoItemEntity } from './todo-item.entity';
import { Question } from './question.entity';
import { Category } from './category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoItemEntity,
      TodoListEntity,
      Question,
      Category,
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DbModule {}
