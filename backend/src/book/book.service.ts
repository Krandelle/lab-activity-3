// src/book/book.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  // 1. Inject the Book repository
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  // 2. Fix the findAll function
  findAll() {
    // This tells TypeORM to also fetch the related author and category
    return this.bookRepository.find({ relations: ['author', 'category'] });
  }

  findOne(id: number) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}