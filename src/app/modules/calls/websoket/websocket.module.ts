import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocketGateway';
import { ActivatedServices } from '../services/activated.services';

@Module({
  providers: [WebsocketGateway, ActivatedServices],
  exports: [WebsocketGateway], // Добавляем экспорт WebsocketGateway
})
export class WebsocketModule {}
