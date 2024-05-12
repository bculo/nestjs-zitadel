import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    TodoModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
