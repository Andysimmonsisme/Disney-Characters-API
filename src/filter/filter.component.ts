import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  constructor() {}

  filter: string;

  @Output() sendFilterChange = new EventEmitter<string>();

  handleFilterChange() {
    this.sendFilterChange.emit(this.filter);
  }
}
