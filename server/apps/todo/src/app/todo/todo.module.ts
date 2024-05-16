import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { DbModule } from '@server/db';
import { TestModule } from '../test/test.module';

@Module({
  imports: [DbModule, TestModule],
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
  exports: ['CONNECTION'],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TodoController);
  }
}
