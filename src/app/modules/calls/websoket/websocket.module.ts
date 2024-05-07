import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocketGateway';

@Module({
  providers: [WebsocketGateway],
  exports: [WebsocketGateway], // Добавляем экспорт WebsocketGateway
})
export class WebsocketModule {}
