import { EntitySchema } from 'typeorm';
import { TodoItemEntity } from './todo-item.entity';

// export const TodoItemSchema = new EntitySchema<TodoItemEntity>({
//   name: 'TodoItemEntity',
//   target: TodoItemEntity,
//   columns: {
//     id: {
//       type: 'uuid',
//       primary: true,
//       generated: 'uuid',
//       nullable: false,
//     },
//     name: {
//       type: String,
//       nullable: false,
//     },
//     description: {
//       type: String,
//       nullable: false,
//     },
//   },
//   relations: {
//     todoList: {
//       type: 'many-to-one',
//       nullable: false,
//       target: 'TodoListEntity',
//     },
//   },
// });
