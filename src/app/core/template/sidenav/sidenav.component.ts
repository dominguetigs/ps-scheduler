import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SidenavService } from './sidenav.service';

import { IMenu } from './interfaces/menu.interface';

import { MENU } from './menu.constant';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  mode: MatDrawerMode;
  menu: IMenu = MENU;
  opened: boolean = true;

  private _unsubscribeAll: Subject<any>;

  constructor(private _media: MediaObserver, private _sidenavService: SidenavService) {
    this._unsubscribeAll = new Subject();

    this._media.media$.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.handleMediaChange();
    });
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._sidenavService.toggleSidenavEventChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Private Methods
  // -----------------------------------------------------------------------------------------------------------------

  private handleMediaChange() {
    if (this._media.isActive('lt-md')) {
      this.mode = 'over';
      this.opened = false;
    } else {
      this.mode = 'side';
      this.opened = true;
    }
  }
}
