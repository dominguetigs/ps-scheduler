import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { isEqual } from 'date-fns';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as _ from 'lodash';

import { ToastrService } from 'ngx-toastr';

import { CalendarEvent } from 'angular-calendar';

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

import { Calendar } from '../calendar.model';

@Component({
  selector: 'app-calendar-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})
export class CalendarDialogComponent implements OnDestroy {
  calendarInstance: Calendar;
  dialogData: any;
  formControls: { [key: string]: FormControl };
  isEditMode: boolean;

  private _dialogDataCache: CalendarEvent;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _dialogRef: MatDialogRef<CalendarDialogComponent>,
    private _toastr: ToastrService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: { action: string; data: CalendarEvent; calendarInstance: Calendar }
  ) {
    this.isEditMode = data.action !== 'new';
    this.calendarInstance = data?.calendarInstance;
    this.dialogData = data.data;
    this._dialogDataCache = _.cloneDeep(this.dialogData);

    this._unsubscribeAll = new Subject();

    this._createFormControls();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  deleteEvent(): void {
    this.calendarInstance.deleteEvent(this.dialogData);
    this.calendarInstance.refresh.next();
    this._dialogRef.close();
  }

  updateEvent(event: CalendarEvent): void {
    const index = this.calendarInstance.events.indexOf(this.dialogData);
    this.calendarInstance.events.splice(index, 1);
    this.calendarInstance.events.push(event);
    this.calendarInstance.refresh.next();
    this._dialogRef.close();
  }

  close(): void {
    if (this._dialogDataChanged()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        actions: {
          no: 'Cancel',
          yes: `Discard`,
        },
        message: 'Discard unsaved changes?',
      };

      this._dialog
        .open(ConfirmationDialogComponent, dialogConfig)
        .afterClosed()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response) => {
          if (response) {
            if (this.isEditMode) {
              this.updateEvent(this._dialogDataCache);
            } else {
              this.deleteEvent();
            }
          }
        });
    } else if (this.isEditMode) {
      this._dialogRef.close();
    } else {
      this.deleteEvent();
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

  private _dialogDataChanged(): boolean {
    for (const key of ['start', 'end', 'title', 'color', 'meta']) {
      switch (key) {
        case 'start':
        case 'end':
          if (!isEqual(this.dialogData[key] as Date, this._dialogDataCache[key] as Date)) {
            return true;
          }
          break;
        case 'title':
          if (this.dialogData[key] !== this._dialogDataCache[key]) {
            return true;
          }
          break;

        case 'color':
          if (this.dialogData[key]?.primary !== this._dialogDataCache[key]?.primary) {
            return true;
          }
          break;
        case 'meta':
          if (this.dialogData[key].message !== this._dialogDataCache[key].message) {
            return true;
          } else if (
            _.differenceWith(this.dialogData[key].phoneList, this._dialogDataCache[key].phoneList, _.isEqual).length ||
            _.differenceWith(this._dialogDataCache[key].phoneList, this.dialogData[key].phoneList, _.isEqual).length
          ) {
            return true;
          }
      }
    }

    return false;
  }

  private _createFormControls(): void {
    this.formControls = {
      title: new FormControl(this.dialogData.title ?? '', Validators.required),
      message: new FormControl(this.dialogData.meta?.message ?? '', Validators.required),
    };
  }

  private _isValidEvent(): boolean {
    return this.dialogData.title && this.dialogData.meta.message && this.dialogData.meta?.phoneList?.length;
  }

  private _showErrorMessage(): void {
    this.formControls.title.markAsTouched({ onlySelf: true });
    this.formControls.message.markAsTouched({ onlySelf: true });
    this._toastr.error('All fields are required.');
  }
}
