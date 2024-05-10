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
import { CreateTodoListItem } from './dto/create-todo-list.dto';

@Controller({ path: 'api/todo' })
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create-item')
  createItem(@Body(new ValidationPipe()) req: CreateTodoItem) {
    this.todoService.createTodoItem(req);
  }

  @Post('create-list')
  createList(@Body(new ValidationPipe()) req: CreateTodoListItem) {
    this.todoService.CreateTodoListItem(req);
  }

  @Get('all-todo-items')
  async allItems() {
    return await this.todoService.allTodoItems();
  }

  @Get('all-todo-lists')
  async allTodoLists() {
    return await this.todoService.allTodoLists();
  }

  @Get('todo-item/:id')
  findOneTodoItem(@Param('id') name: string) {
    const item = this.todoService.findOneTodoItem(name);
    if (!item) throw new NotFoundException();
    return item;
  }

  @Get('todo-list/:id')
  findOneTodoList(@Param('id') name: string) {
    const item = this.todoService.findOneTodoList(name);
    if (!item) throw new NotFoundException();
    return item;
  }
}
