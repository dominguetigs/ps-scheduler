import { Component } from '@angular/core';

import { SidenavService } from '../sidenav/sidenav.service';

import { MENU_ITEMS } from './profile-menu-items.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems = MENU_ITEMS;

  constructor(private _sidenavService: SidenavService) {}

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  toggle(): void {
    this._sidenavService.toggleSidenav();
  }
}
