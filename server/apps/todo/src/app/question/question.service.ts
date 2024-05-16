import { CreateCategoryDto } from './dto/create-category.dto';
import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from '@server/db';
import { Category } from '@server/db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    await this.questionRepository.save({
      text: createQuestionDto.text,
      title: createQuestionDto.title,
    });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepository.save({
      name: createCategoryDto.name,
    });
  }

  async test() {
    const categories = await this.categoryRepository.find({
      relations: {
        questions: true,
      },
    });

    if (categories.length === 0) return;

    const newQuestion = { text: '123', title: '123-t' } as Question;
    await this.questionRepository.save(newQuestion);
    categories[0].questions.push(newQuestion);
    await this.categoryRepository.save(categories);
  }
}
