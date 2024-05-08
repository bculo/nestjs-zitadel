import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
