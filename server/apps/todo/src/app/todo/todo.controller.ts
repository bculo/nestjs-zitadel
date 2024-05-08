import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
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
  create(@Body() req: CreateTodoItem) {
    this.todoService.create(req);
  }

  @Get('all')
  all() {
    return this.todoService.all();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    const item = this.todoService.findOne(name);
    if (!item) throw new NotFoundException();
    return item;
  }
}
