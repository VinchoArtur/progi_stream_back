import { WebSocketGateway, OnGatewayConnection, WebSocketServer, OnGatewayInit, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  clients: Set<Socket> = new Set();

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected');
    this.clients.add(client);

    // Обработка отключения клиента
    client.on('disconnect', () => {
      console.log('Client disconnected');
      this.clients.delete(client);
    });
  }

  @SubscribeMessage('call')
  handleCall(@MessageBody() data: any, client: Socket) {
    console.log('Received call from client:', data);
    // Рассылаем данные потока клиента всем остальным клиентам
    this.clients.forEach(ws => {
      if (ws !== client) {
        ws.emit('stream', data);
      }
    });
  }

  @SubscribeMessage('iceCandidate')
  handleIceCandidate(@MessageBody() data: any, client: Socket) {
    console.log('Received ICE candidate from client:', data);
    // Пересылаем данные ICE кандидата всем остальным клиентам
    this.clients.forEach(ws => {
      if (ws !== client) {
        ws.emit('iceCandidate', data);
      }
    });
  }
}
