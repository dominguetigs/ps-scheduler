import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent],
  imports: [SharedModule],
  exports: [SchedulerComponent],
})
export class SchedulerModule {}
