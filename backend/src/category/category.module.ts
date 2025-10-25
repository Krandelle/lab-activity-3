// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Import this
import { Category } from './entities/category.entity'; // 2. Import this

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // 3. Add this line
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}