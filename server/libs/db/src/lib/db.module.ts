import { TodoListEntity } from './todo-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DbModule {}
