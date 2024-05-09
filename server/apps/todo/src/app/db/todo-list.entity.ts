import { Entity } from 'typeorm';
import { TodoItemEntity } from './todo-item.entity';

@Entity()
export class TodoListEntity {
  id: string;
  name: string;
  items: TodoItemEntity[];
}
