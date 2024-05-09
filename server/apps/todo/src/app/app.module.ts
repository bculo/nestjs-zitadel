import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
