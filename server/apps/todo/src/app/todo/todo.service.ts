import { CreateTodoListItem } from './dto/create-todo-list.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItemEntity } from '../db/todo-item.entity';
import { Repository } from 'typeorm';
import { TodoListEntity } from '../db/todo-list.entity';
import { CreateTodoItem } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todoItemRepository: Repository<TodoItemEntity>,
    @InjectRepository(TodoListEntity)
    private readonly todoListRepository: Repository<TodoListEntity>
  ) {}

  async createTodoItem(request: CreateTodoItem): Promise<void> {
    console.log(request);
    await this.todoItemRepository.insert({
      name: request.name,
      description: request.description,
      todoListId: request.todoListId,
    });
  }

  async CreateTodoListItem(request: CreateTodoListItem): Promise<void> {
    await this.todoListRepository.save({
      name: request.name,
    });
  }

  async allTodoItems(): Promise<TodoItemEntity[]> {
    return await this.todoItemRepository.find();
  }

  async allTodoLists(): Promise<TodoListEntity[]> {
    return await this.todoListRepository.find();
  }

  async findOneTodoItem(id: string): Promise<TodoItemEntity | null> {
    return await this.todoItemRepository.findOneBy({ id: id });
  }

  async findOneTodoList(id: string): Promise<TodoListEntity | null> {
    return await this.todoListRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        items: true,
      },
    });
  }
}
