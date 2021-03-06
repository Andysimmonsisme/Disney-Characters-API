import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name;
  page: number;
  totalPages: number;
  filter: string;

  receiveTotalPages($event) {
    this.totalPages = $event;
  }

  receivePageChange($event) {
    this.page = $event;
  }

  receiveFilterChange($event) {
    this.filter = $event;
  }
}
