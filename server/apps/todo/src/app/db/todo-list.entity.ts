import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoItemEntity } from './todo-item.entity';

@Entity()
export class TodoListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => TodoItemEntity, (item) => item.todoList)
  items: TodoItemEntity[];
}
