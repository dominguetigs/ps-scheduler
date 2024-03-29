import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { ToastrModule } from 'ngx-toastr';

import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxCsvParserModule } from 'ngx-csv-parser';

import { CalendarDialogComponent } from './components/calendar/calendar-dialog/calendar-dialog.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChipsInputComponent } from './components/chips-input/chips-input.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CSVExtractorComponent } from './components/csv-extractor/csv-extractor.component';

@NgModule({
  declarations: [
    CalendarDialogComponent,
    CalendarComponent,
    ChipsInputComponent,
    ColorPickerComponent,
    ConfirmationDialogComponent,
    CSVExtractorComponent,
  ],
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

    ToastrModule.forRoot(),

    FlexLayoutModule,

    NgxCsvParserModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,

    FlatpickrModule,
    CalendarModule,

    ToastrModule,

    FlexLayoutModule,

    NgxCsvParserModule,

    CalendarDialogComponent,
    CalendarComponent,
    ChipsInputComponent,
    ColorPickerComponent,
    ConfirmationDialogComponent,
    CSVExtractorComponent,
  ],
})
export class SharedModule {}
