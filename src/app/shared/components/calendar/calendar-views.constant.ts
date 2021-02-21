import { CalendarView } from 'angular-calendar';
import { ICalendarView } from './calendar-view.interface';

export const CALENDAR_VIEWS: ICalendarView[] = [
  {
    value: CalendarView.Month,
    option: 'Month',
  },
  {
    value: CalendarView.Week,
    option: 'Week',
  },
  {
    value: CalendarView.Day,
    option: 'Day',
  },
];
