/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TodoController],
  providers: [
    {
      provide: 'CONNECTION',
      useValue: 'hello',
    },
    {
      provide: TodoService,
      useClass: TodoService,
    },
  ],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TodoController);
  }
}
