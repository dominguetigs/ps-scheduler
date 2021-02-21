import { Component } from '@angular/core';

import { EventColor } from 'calendar-utils';

@Component({
  selector: 'app-custom-colorpicker',
  templateUrl: './custom-colorpicker.component.html',
  styleUrls: ['./custom-colorpicker.component.scss'],
})
export class ColorPickerComponent {
  predefinedColors: EventColor[];
}
