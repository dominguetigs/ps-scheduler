import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

import { IUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser: ReplaySubject<IUser> = new ReplaySubject();

  constructor() {
    this.currentUser.next({
      name: 'Gustavo Domingueti',
      profile: 'Admin',
      photoUrl: '/assets/img/user.png',
    });
  }
}
