import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from '../../../entities/users/user.entity';

export class UserSubscriber implements EntitySubscriberInterface {

  constructor(private dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): Function | string {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): Promise<User> | void {
    console.log('beforeInsert', event.entity);
  }
}