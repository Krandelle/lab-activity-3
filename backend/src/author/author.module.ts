// src/author/author.module.ts
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Import this
import { Author } from './entities/author.entity'; // 2. Import this

@Module({
  imports: [TypeOrmModule.forFeature([Author])], // 3. Add this line
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}