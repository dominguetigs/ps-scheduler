import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { CalendarEvent } from 'angular-calendar';

import { Calendar } from '../calendar.model';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})
export class CalendarDialogComponent {
  calendarInstance: Calendar;
  dialogData: any;
  isEditMode: boolean;

  constructor(
    private _dialogRef: MatDialogRef<CalendarDialogComponent>,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) data: { action: string; data: CalendarEvent; calendarInstance: Calendar }
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

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  deleteEvent(): void {
    this.calendarInstance.deleteEvent(this.dialogData);
    this.calendarInstance.refresh.next();
    this._dialogRef.close();
  }

  close(): void {}

  save(): void {}

  // -----------------------------------------------------------------------------------------------------------------
  // Private Methods
  // -----------------------------------------------------------------------------------------------------------------

  private _isValidEvent(): boolean {
    return this.dialogData.title && this.dialogData.meta.message && this.dialogData.meta.contacts?.length;
  }
}
