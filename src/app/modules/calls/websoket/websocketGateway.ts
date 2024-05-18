import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as stream from 'node:stream';
import { ActivatedServices } from '../services/activated.services';

@WebSocketGateway({ namespace: 'calls', cors: {origin: '*'} })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly activateService: ActivatedServices) {
  }

  private activeUsers: Map<string, any> = new Map();

  @SubscribeMessage('calls')
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): string {
    const { userId, streamId, tracks } = data;
    this.activateService.activatedUsers = {userId, stream: { streamId, tracks }}
    this.activeUsers.set(userId, client);
    this.activeUsers.forEach((otherClient, otherUserId) => {
      if (otherUserId !== userId) {
        const streamInfo = this.activateService.activatedUsers.get(otherUserId);
        otherClient.emit('remoteStream', {userId, streamId: streamInfo.streamId, tracks: streamInfo.tracks})
      }
    })
    return '';
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket): void {
    this.activeUsers.forEach((otherClient, otherUserId) => {
      if (otherClient === client) {
        this.activeUsers.delete(otherUserId);
      }
    })
  }

}
