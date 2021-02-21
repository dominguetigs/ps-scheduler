import { Component, ChangeDetectionStrategy } from '@angular/core';

import { startOfDay, subDays, addDays, addHours } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';

import { PREDEFINED_COLORS } from 'src/app/shared/components/color-picker/predefined-colors.constant';

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Event 1',
      color: PREDEFINED_COLORS[0],
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: {
        message: '',
        contacts: [
          {
            name: 'João',
            phone: '(11) 9 9999-9990',
          },
          {
            name: 'João',
            phone: '(11) 9 8888-1245',
          },
        ],
      },
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'Event 4',
      color: PREDEFINED_COLORS[7],
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: {
        message: '',
        contacts: [
          {
            name: 'João',
            phone: '(11) 9 9999-9990',
          },
        ],
      },
    },
  ];

  constructor() {}
}
