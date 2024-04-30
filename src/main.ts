import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap(): Promise<void> {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3001);
}
bootstrap();
