import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { query } from '@angular/animations';

@Component({
  selector: 'disney-characters',
  templateUrl: './disney-characters.component.html',
})
export class DisneyCharactersComponent implements OnChanges {
  url = 'https://api.disneyapi.dev/characters';
  headers;
  config;
  disneyCharacters;
  totalPages;

  @Input() page: number;
  @Output() sendTotalPages = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page']) {
      this.populateDisneyCharacters();
    }
  }

  /** GET disney characters from the server */
  getDisneyCharacters() {
    let queryString = this.page > 1 ? '?page=' + this.page : '';
    return this.http
      .get(this.url + queryString, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(null));
  }

  populateDisneyCharacters() {
    this.getDisneyCharacters().subscribe((resp) => {
      // display its headers
      const keys = resp.headers.keys();
      this.headers = keys.map((key) => `${key}: ${resp.headers.get(key)}`);

      this.config = { ...resp.body! };
      this.config.data.forEach((item) => console.log(item));
      this.totalPages = this.config.totalPages;
      this.disneyCharacters = this.config.data;

      this.sendTotalPages.emit(this.totalPages);
    });
  }

  isCharacterFeature(val) {
    return Array.isArray(val) && val.length > 0;
  }

  convertToTitleCase(val) {
    return val
      .split(/(?=[A-Z])/)
      .map((p) => {
        return p[0].toUpperCase() + p.slice(1);
      })
      .join(' ');
  }

  ngOnInit() {
    this.populateDisneyCharacters();
  }
}
