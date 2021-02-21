import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CalendarDialogComponent } from './components/calendar/calendar-dialog/calendar-dialog.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

@NgModule({
  declarations: [CalendarDialogComponent, CalendarComponent, ColorPickerComponent],
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
    CalendarComponent,
    ColorPickerComponent,
  ],
})
export class SharedModule {}
