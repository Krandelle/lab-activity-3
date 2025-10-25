// src/author/author.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  // 1. Inject the Author repository
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepository.save(createAuthorDto);
  }

  // 2. Fix the findAll function
  findAll() {
    return this.authorRepository.find();
  }

  findOne(id: number) {
    return this.authorRepository.findOneBy({ id });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorRepository.delete(id);
  }
}