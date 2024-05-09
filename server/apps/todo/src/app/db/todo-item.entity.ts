import { TodoListEntity } from './todo-list.entity';
import { Entity } from 'typeorm';

@Entity()
export class TodoItemEntity {
  id: string;
  name: string;
  description?: string;
  list: TodoListEntity;
}
