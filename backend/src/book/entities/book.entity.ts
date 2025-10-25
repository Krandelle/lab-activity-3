// src/book/entities/book.entity.ts
import { Author } from '../../author/entities/author.entity';
import { Category } from '../../category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'int', nullable: true })
  publicationYear: number;

  // --- This is the Author relationship ---
  // "Many" books can have "One" author.
  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;

  // --- This is the Category relationship ---
  // "Many" books can have "One" category.
  @ManyToOne(() => Category, (category) => category.books, { eager: true })
  category: Category;
}