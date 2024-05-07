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

  // Создаем HTTP-сервер
  const httpServer = http.createServer(server);
  const io = require('socket.io')(httpServer, {
    cors: {
      origin: "*", // Разрешаем запросы с любого источника
      methods: ["GET", "POST"], // Разрешаем только методы GET и POST
    }
  });

  // middleware для обработки запросов к пути /socket.io/
  io.use((socket, next) => {
    // ваша логика обработки здесь
    console.log("Incoming Socket.IO request:", socket.handshake.url);
    next();
  });
  // Добавляем маршрут для обработки запросов к /socket.io/
  server.get('/socket.io/*', (req, res) => {
    // Здесь может быть ваша логика обработки запросов к /socket.io/
    // Например, отправка index.html или 404 ошибки
    res.status(200).send('Not Found');
  });

  // Создаем экземпляр socket.io и привязываем его к HTTP-серверу
  app.useWebSocketAdapter(new IoAdapter(httpServer));

  await app.listen(3001);
}
bootstrap();
