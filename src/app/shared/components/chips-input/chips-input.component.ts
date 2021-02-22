import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent, MatChipList } from '@angular/material/chips';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent implements OnInit {
  selectable = true;
  removable = true;
  readonly separatorKeysCodes = [ENTER, COMMA];

  @Input() items: string[] = [];
  @Input() label: string = 'Itens';
  @Input() required: boolean = false;

  @ViewChild('chipList')
  chipList: MatChipList;

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {}

  // -----------------------------------------------------------------------------------------------------------------
  // Public Methods
  // -----------------------------------------------------------------------------------------------------------------

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.items.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.items.indexOf(fruit);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
}
