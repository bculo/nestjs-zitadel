import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoItem } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller({ path: 'api/todo' })
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  test() {
    return 'TodoController';
  }

  @Post('create')
  create(@Body(new ValidationPipe()) req: CreateTodoItem) {
    this.todoService.create(req);
  }

  @Get('all')
  async all() {
    return await this.todoService.all();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    const item = this.todoService.findOne(name);
    if (!item) throw new NotFoundException();
    return item;
  }
}
