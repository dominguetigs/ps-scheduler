import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IColor } from './color.interface';

import { PREDEFINED_COLORS } from './predefined-colors.constant';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  predefinedColors = PREDEFINED_COLORS;

  @Input() selected: IColor = PREDEFINED_COLORS[0];
  @Output() onSelectChanged: EventEmitter<IColor> = new EventEmitter();
}
