import { Component, OnDestroy } from '@angular/core';
import { NavItem } from './template/menu-list-item/nav-item.interface';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { menu } from './template/menu-list-item/menu.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  opened: boolean = true;
  menu: NavItem[] = menu;

  private _mediaWatcher: Subscription;

  constructor(private _media: MediaObserver) {
    this._mediaWatcher = this._media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    });
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this._media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy() {
    this._mediaWatcher.unsubscribe();
  }
}
