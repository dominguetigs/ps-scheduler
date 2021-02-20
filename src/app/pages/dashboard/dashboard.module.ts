import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboad.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
