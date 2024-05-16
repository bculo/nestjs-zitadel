import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { DbModule } from '@server/db';

@Module({
  imports: [DbModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
