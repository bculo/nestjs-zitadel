import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
