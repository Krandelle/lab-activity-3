// src/category/entities/category.entity.ts
import { Book } from '../../book/entities/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Category names should be unique
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}