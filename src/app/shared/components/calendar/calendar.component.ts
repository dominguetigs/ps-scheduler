import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CalendarEvent } from 'angular-calendar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Calendar } from './calendar.model';

import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';

import { ICalendarView } from './calendar-view.interface';
import { CALENDAR_VIEWS } from './calendar-views.constant';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendar: Calendar;
  views: ICalendarView[];

  private _unsubscribeAll: Subject<any>;

  @Input() events: CalendarEvent[] = [];

  constructor(private _dialog: MatDialog) {
    this.views = CALENDAR_VIEWS;
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.calendar = new Calendar(this.events);
    this.calendar.handleEventChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ action, event }) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = {
        action,
        data: event,
        calendarInstance: this.calendar,
      };

      this._dialog.open(CalendarDialogComponent, dialogConfig);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
