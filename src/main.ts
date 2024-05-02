import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap(): Promise<void> {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.use(cors())
  await app.listen(3001);
}
bootstrap();
