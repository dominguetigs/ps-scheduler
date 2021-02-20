import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavItem } from './nav-item.interface';
import { Router } from '@angular/router';
import { NavService } from './nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  providers: [NavService],
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number = 0;

  constructor(public navService: NavService, public router: Router) {}

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
