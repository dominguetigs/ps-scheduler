import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';

import { UserService } from '../services/user.service';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: IUser;

  private _unsubscribeAll: Subject<any>;

  constructor(private _userService: UserService, private _sidenavService: SidenavService) {
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._userService.currentUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: IUser) => {
      console.log(user);
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  toggle(): void {
    this._sidenavService.toggleSidenav();
  }
}
