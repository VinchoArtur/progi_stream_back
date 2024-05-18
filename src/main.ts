import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as http from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap(): Promise<void> {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Настраиваем CORS для HTTP-запросов
  app.enableCors({
    origin: "*", // Разрешаем запросы с любого источника
    methods: ["GET", "POST"], // Разрешаем только методы GET и POST
  });

  await app.listen(3001);
}
bootstrap();
