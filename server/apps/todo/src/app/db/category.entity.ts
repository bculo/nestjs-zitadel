import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Question, (question) => question.categories)
  questions: Question[];
}
