import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { MenuListItemComponent } from './sidenav/menu-list-item/menu-list-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { SidenavService } from './sidenav/sidenav.service';

@NgModule({
  declarations: [HeaderComponent, MenuListItemComponent, SidenavComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, MenuListItemComponent, SidenavComponent],
  providers: [SidenavService],
})
export class CoreModule {}
