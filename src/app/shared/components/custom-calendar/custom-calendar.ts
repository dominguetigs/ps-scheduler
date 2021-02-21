import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';

import { ReplaySubject, Subject } from 'rxjs';

export class CustomCalendar {
  CalendarView = CalendarView;
  activeDayIsOpen: boolean;
  handleEventChanged: ReplaySubject<any>;
  refresh: Subject<any>;
  view: CalendarView;
  viewDate: Date;

  private _events: CalendarEvent[];

  constructor(events: CalendarEvent[]) {
    this._setDefaults();
    this.events = events;
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Getters/Setters
  // -----------------------------------------------------------------------------------------------------------------

  set events(events: CalendarEvent[]) {
    this._events = events.map((e: CalendarEvent) => ({ ...e, actions: this._getActions() }));
  }

  get events(): CalendarEvent[] {
    return this._events;
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event?: CalendarEvent): void {
    this.handleEventChanged.next({ action, event });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        // color: 'colors.red',
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          message: '',
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // -----------------------------------------------------------------------------------------------------------------
  // Private Methods
  // -----------------------------------------------------------------------------------------------------------------

  private _getActions(): CalendarEventAction[] {
    return [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter((iEvent) => iEvent !== event);
          // this.handleEvent('Deleted', event);
        },
      },
    ];
  }

  private _setDefaults(): void {
    this.activeDayIsOpen = true;
    this.handleEventChanged = new ReplaySubject();
    this.refresh = new Subject();
    this.view = CalendarView.Month;
    this.viewDate = new Date();
  }
}
