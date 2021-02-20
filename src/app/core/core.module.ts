import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { UserService } from './services/user.service';
import { MenuListItemComponent } from './sidenav/menu-list-item/menu-list-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { SidenavService } from './sidenav/sidenav.service';

@NgModule({
  declarations: [HeaderComponent, MenuListItemComponent, SidenavComponent],
  imports: [RouterModule, SharedModule],
  exports: [HeaderComponent, MenuListItemComponent, SidenavComponent],
  providers: [UserService, SidenavService],
})
export class CoreModule {}
