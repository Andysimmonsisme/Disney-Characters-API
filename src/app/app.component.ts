import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Disney lover';
  page: number;
  totalPages: number;

  receiveTotalPages($event) {
    this.totalPages = $event;
  }

  receivePageChange($event) {
    this.page = $event;
  }
}
