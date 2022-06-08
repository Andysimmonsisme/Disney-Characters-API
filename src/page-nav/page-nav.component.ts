import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'page-nav',
  templateUrl: './page-nav.component.html',
})
export class PageNavComponent implements OnChanges {
  page = 1;
  goToPage = 1;

  @Input() totalPages: number;
  @Input() receivePageChange;
  @Output() sendPageChange = new EventEmitter<number>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['receivePageChange'] &&
      changes['receivePageChange'].currentValue
    ) {
      this.goToPage = this.page = changes['receivePageChange'].currentValue;
    }
  }

  loadPage() {
    this.validatePageNum();
    this.page = this.goToPage;
    this.sendPageChange.emit(this.page);
  }
  lastPage() {
    this.goToPage = --this.page;
    this.loadPage();
  }
  nextPage() {
    this.goToPage = ++this.page;
    this.loadPage();
  }
  validatePageNum() {
    if (this.goToPage < 1) {
      this.goToPage = 1;
    }
    if (this.goToPage > this.totalPages && this.totalPages > 0) {
      this.goToPage = this.totalPages;
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      this.loadPage();
    }
  }
}
