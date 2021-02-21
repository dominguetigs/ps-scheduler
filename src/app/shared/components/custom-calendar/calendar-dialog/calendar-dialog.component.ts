import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { endOfDay, startOfDay } from 'date-fns';

import { CustomCalendar } from '../custom-calendar';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})
export class CalendarDialogComponent {
  calendarInstance: CustomCalendar;
  dialogData: any;
  isEditMode: boolean;

  constructor(private _dialogRef: MatDialogRef<CalendarDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.isEditMode = !!data?.data;
    this.calendarInstance = data?.calendarInstance;
    this.dialogData = data?.data ?? {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      // color: 'colors.red',
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  save() {
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close();
  }
}
