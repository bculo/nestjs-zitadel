import { DataSource } from 'typeorm';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoItem } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { CreateTodoListItem } from './dto/create-todo-list.dto';
import { TodoItemEntity } from '@server/db';
import { TestService } from '../test/test.service';

@Controller({ path: 'api/todo' })
@ApiTags('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly source: DataSource,
    private readonly testService: TestService
  ) {}

  @Post('create-item')
  createItem(@Body(new ValidationPipe()) req: CreateTodoItem) {
    this.todoService.createTodoItem(req);
  }

  @Post('create-list')
  createList(@Body(new ValidationPipe()) req: CreateTodoListItem) {
    this.todoService.CreateTodoListItem(req);
  }

  @Get('all-todo-items')
  @ApiResponse({ status: HttpStatus.OK, type: TodoItemEntity, isArray: true })
  async allItems(): Promise<TodoItemEntity[]> {
    return await this.todoService.allTodoItems();
  }

  @Get('all-todo-lists')
  async allTodoLists() {
    console.log(this.testService.getIdentifier());
    return await this.todoService.allTodoLists();
  }

  @Get('todo-item/:id')
  findOneTodoItem(@Param('id') name: string) {
    const item = this.todoService.findOneTodoItem(name);
    if (!item) throw new NotFoundException();
    return item;
  }

  @Get('todo-list/:id')
  async findOneTodoList(@Param('id') id: string) {
    const item = this.todoService.findOneTodoList(id);
    if (!item) throw new NotFoundException();
    return item;
  }
}
