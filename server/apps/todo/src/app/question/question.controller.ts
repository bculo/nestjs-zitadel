import { Controller, Post, Body, Get } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('api/question')
@ApiTags('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create-question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Post('create-category')
  createCategory(@Body() createCategoryDot: CreateCategoryDto) {
    return this.questionService.createCategory(createCategoryDot);
  }

  @Get('test')
  test() {
    return this.questionService.test();
  }
}
