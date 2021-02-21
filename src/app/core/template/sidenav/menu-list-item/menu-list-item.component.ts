import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService } from '../sidenav.service';

import { NavItem } from '../nav-item.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;

  private _unsubscribeAll: Subject<any>;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  @Input() item: NavItem;
  @Input() depth: number = 0;

  constructor(public sidenavService: SidenavService, public router: Router) {
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.sidenavService.currentUrl.pipe(takeUntil(this._unsubscribeAll)).subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
