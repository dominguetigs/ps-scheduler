import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { CalendarEvent } from 'angular-calendar';

import { Calendar } from '../calendar.model';

@Component({
  selector: 'app-calendar-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})
export class CalendarDialogComponent {
  calendarInstance: Calendar;
  dialogData: any;
  isEditMode: boolean;

  formControls: { [key: string]: FormControl };

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
    this._createFormControls();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  deleteEvent(): void {
    this.calendarInstance.deleteEvent(this.dialogData);
    this.calendarInstance.refresh.next();
    this._dialogRef.close();
  }

  close(): void {
    if (this._isValidEvent()) {
      this._dialogRef.close();
    } else {
      this._showErrorMessage();
    }
  }

  save(): void {
    if (this._isValidEvent()) {
      this._dialogRef.close();
    } else {
      this._showErrorMessage();
    }
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Private Methods
  // -----------------------------------------------------------------------------------------------------------------

  private _createFormControls(): void {
    this.formControls = {
      title: new FormControl(this.dialogData.title ?? '', Validators.required),
      message: new FormControl(this.dialogData.meta?.message ?? '', Validators.required),
    };
  }

  private _isValidEvent(): boolean {
    return this.dialogData.title && this.dialogData.meta.message && this.dialogData.meta.phoneList?.length;
  }

  private _showErrorMessage(): void {
    this.formControls.title.markAsTouched({ onlySelf: true });
    this.formControls.message.markAsTouched({ onlySelf: true });
    this._toastr.error('All fields is required.');
  }
}
