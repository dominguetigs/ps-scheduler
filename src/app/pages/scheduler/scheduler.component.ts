import { Component } from '@angular/core';

interface IPeriod {
  value: string;
  option: string;
}
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  periods: IPeriod[];
  selectedPeriod: string;

  constructor() {
    this.periods = [
      {
        value: 'month',
        option: 'Month',
      },
      {
        value: 'week',
        option: 'Week',
      },
      {
        value: 'day',
        option: 'Day',
      },
    ];
    this.selectedPeriod = 'month';
  }
}
