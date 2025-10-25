// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // This is the file name for our database
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Tells TypeORM where to find our table definitions
      synchronize: true, // This automatically creates database tables from your entities. Perfect for development!
    }),
    AuthorModule,
    CategoryModule,
    BookModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}