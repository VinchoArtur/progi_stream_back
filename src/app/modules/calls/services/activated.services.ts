import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ActivatedServices {
  private _activatedUsers: Map<string, any> = new Map<string, any>;
  get activatedUsers(): Map<string, any> {
    return this._activatedUsers;
  }

  set activatedUsers(value: {userId: string, stream: any}) {
    this._activatedUsers.set(value.userId, value.stream);
  }
}
