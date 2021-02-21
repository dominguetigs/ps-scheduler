import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  toggleSidenavEventChanged: ReplaySubject<any> = new ReplaySubject();

  constructor(private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  toggleSidenav(): void {
    this.toggleSidenavEventChanged.next();
  }
}
