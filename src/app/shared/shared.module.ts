import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CalendarDialogComponent } from './components/custom-calendar/calendar-dialog/calendar-dialog.component';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';

@NgModule({
  declarations: [CalendarDialogComponent, CustomCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,

    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,

    FlatpickrModule,
    CalendarModule,

    FlexLayoutModule,

    CalendarDialogComponent,
    CustomCalendarComponent,
  ],
})
export class SharedModule {}
