/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItemEntity } from '../db/todo-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todoItemRepository: Repository<TodoItemEntity>
  ) {}

  async create(item: Todo) {
    await this.todoItemRepository.save({
      description: item.description,
      name: item.name,
    });
  }

  async all(): Promise<TodoItemEntity[]> {
    return await this.todoItemRepository.find();
  }

  findOne(name: string): Todo | null {
    return null;
  }
}
