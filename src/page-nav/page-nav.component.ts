import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-nav',
  templateUrl: './page-nav.component.html',
})
export class PageNavComponent {
  page = 1;
  goToPage = 1;

  @Input() totalPages: number;
  @Output() sendPageChange = new EventEmitter<number>();

  constructor() {}

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
}
