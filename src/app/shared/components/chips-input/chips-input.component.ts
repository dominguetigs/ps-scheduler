import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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

  readonly separatorKeysCodes = [ENTER];

  @Input() items: string[];
  @Input() label: string = 'Itens';
  @Input() required: boolean = false;
  @Input() test: any = [];
  @Output() itemsChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('chipList')
  chipList: MatChipList;

  // -----------------------------------------------------------------------------------------------------------------
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.items = this.items ?? [];
  }

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

    this.itemsChanged.emit(this.items);
  }

  remove(fruit: string): void {
    const index = this.items.indexOf(fruit);

    if (index >= 0) {
      this.items.splice(index, 1);
    }

    this.itemsChanged.emit(this.items);
  }
}
