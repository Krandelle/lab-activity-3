// src/book/book.module.ts
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Import this
import { Book } from './entities/book.entity'; // 2. Import this

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // 3. Add this line
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}