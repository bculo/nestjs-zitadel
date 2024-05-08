/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];

  create(item: Todo) {
    this.todos.push(item);
  }

  all(): Todo[] {
    return [...this.todos];
  }

  findOne(name: string): Todo | null {
    return this.todos.find((x) => x.name === name);
  }
}
