// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- 1. Enable CORS ---
  // This line allows your frontend to talk to your backend
  app.enableCors();

  // --- 2. Set up Swagger API Documentation ---
  const config = new DocumentBuilder()
    .setTitle('Bookshelf API')
    .setDescription('My first NestJS API for books, authors, and categories')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // This is the URL for your API docs
  SwaggerModule.setup('api/docs', app, document); 

  // --- 3. Set the API port to 3001 ---
  // We'll run the API on port 3001 so it doesn't conflict with React (which uses 3000)
  await app.listen(3001);
}
bootstrap();