import { TodoListEntity } from './todo-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TodoItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  todoListId: string;

  @ManyToOne(() => TodoListEntity, (item) => item.items)
  @JoinColumn({ name: 'todoListId' })
  todoList: TodoListEntity;
}
