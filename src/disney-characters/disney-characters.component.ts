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
  allCharacters;
  totalPages;

  @Input() page: number;
  @Input() filter: string;
  @Output() sendTotalPages = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page']) {
      this.populateDisneyCharacters(true);
    }
    if (changes['filter']) {
      this.filter = changes['filter'].currentValue;
      this.populateDisneyCharacters(false);
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

  populateDisneyCharacters(newPage) {
    if (newPage) {
      this.getDisneyCharacters().subscribe((resp) => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map((key) => `${key}: ${resp.headers.get(key)}`);

        this.config = { ...resp.body! };
        this.config.data.forEach((item) =>
          console.log('populateDisneyCharacters', item)
        );
        this.totalPages = this.config.totalPages;
        this.disneyCharacters = this.allCharacters = this.config.data;

        this.filterCharacters();
        this.sendTotalPages.emit(this.totalPages);
      });
    } else this.filterCharacters();
  }

  filterCharacters() {
    let newData = [];
    this.allCharacters.forEach((chtr) => {
      if (chtr.name.toLowerCase().includes(this.filter)) newData.push(chtr);
      else {
        for (let key in chtr) {
          let val = chtr[key];
          if (Array.isArray(val) && val.length > 0) {
            let combStr = val.join(',');
            if (combStr.toLowerCase().includes(this.filter.toLowerCase())) {
              console.log(combStr, this.filter);
              newData.push(chtr);
              break;
            }
          }
        }
      }
    });
    this.disneyCharacters = newData;
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
    this.populateDisneyCharacters(true);
  }
}
