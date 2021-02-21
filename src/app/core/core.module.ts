import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LogoComponent } from './template/components/logo/logo.component';
import { HeaderComponent } from './template/header/header.component';
import { MenuListItemComponent } from './template/sidenav/menu-list-item/menu-list-item.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';

import { UserService } from './services/user.service';
import { SidenavService } from './template/sidenav/sidenav.service';
import { ProfileComponent } from './template/components/profile/profile.component';

@NgModule({
  declarations: [LogoComponent, ProfileComponent, HeaderComponent, MenuListItemComponent, SidenavComponent],
  imports: [RouterModule, SharedModule],
  exports: [LogoComponent, ProfileComponent, HeaderComponent, MenuListItemComponent, SidenavComponent],
  providers: [UserService, SidenavService],
})
export class CoreModule {}
