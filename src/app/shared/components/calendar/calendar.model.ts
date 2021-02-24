import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';

import { ReplaySubject, Subject } from 'rxjs';

import { PREDEFINED_COLORS } from '../color-picker/predefined-colors.constant';

export class Calendar {
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

  calendarClicked($event: { date: Date; events?: CalendarEvent[] }): void {
    const { date, events } = $event;

    if (events) {
      if (isSameMonth(date, this.viewDate)) {
        this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || !events.length);
        this.viewDate = date;
      }

      if (!events.length) {
        this.addEvent(startOfDay(date), endOfDay(date));
        this.handleEvent('new', this.events[this.events.length - 1]);
      }
    } else {
      this.addEvent(date, endOfDay(date));
      this.handleEvent('new', this.events[this.events.length - 1]);
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
  }

  handleEvent(action: string, event?: CalendarEvent): void {
    let resultEvent = event;

    if (!resultEvent) {
      this.addEvent();
      resultEvent = this.events[this.events.length - 1];
    }

    this.handleEventChanged.next({ action, event: resultEvent });
  }

  addEvent(startDate?: Date, endDate?: Date): void {
    this.events = [
      ...this.events,
      {
        title: 'New scheduler',
        start: startDate ?? startOfDay(new Date()),
        end: endDate ?? endOfDay(new Date()),
        color: PREDEFINED_COLORS[0],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          message: '',
          phoneList: [],
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
        cssClass: 'action-icon',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('edit', event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        cssClass: 'action-icon',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter((iEvent) => iEvent !== event);
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
