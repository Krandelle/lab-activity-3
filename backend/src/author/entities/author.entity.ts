// src/author/entities/author.entity.ts
import { Book } from '../../book/entities/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity() // This tells TypeORM to make a table called "author"
export class Author {
  @PrimaryGeneratedColumn() // This is the "primary key" (a unique ID)
  id: number;

  @Column() // A regular data column
  name: string;

  @Column({ type: 'text', nullable: true }) // A longer text column, can be empty
  bio: string;

  @OneToMany(() => Book, (book) => book.author) // An author can have many books
  books: Book[];
}