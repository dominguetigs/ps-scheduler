import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CalendarEvent } from 'angular-calendar';

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

  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { action: string; data: CalendarEvent; calendarInstance: CustomCalendar }
  ) {
    this.isEditMode = !!data?.data;
    this.calendarInstance = data?.calendarInstance;

    if (data?.data) {
      this.dialogData = data.data;
    } else {
      data.calendarInstance.addEvent();
      this.dialogData = data.calendarInstance.events[data.calendarInstance.events.length - 1];
    }
  }
}
