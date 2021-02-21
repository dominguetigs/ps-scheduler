import { NgModule } from '@angular/core';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent],
  imports: [SchedulerRoutingModule, SharedModule],
  exports: [SchedulerComponent],
})
export class SchedulerModule {}
