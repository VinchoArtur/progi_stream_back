import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'calls', cors: {origin: '*'} })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('calls')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

}
