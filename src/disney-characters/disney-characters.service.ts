import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable()
export class DisneyCharactersService {
  constructor(private http: HttpClient) {}

  url = 'https://api.disneyapi.dev/characters';
  headers;
  config;
  allCharacters;

  /** GET disney characters from the server */
  getDisneyCharacters(page) {
    let queryString = page > 1 ? '?page=' + page : '';
    return this.http
      .get(this.url + queryString, {
        observe: 'response',
        responseType: 'json',
      })
      .pipe(catchError(null));
  }

  filterDisneyCharacters(filter: string) {
    this.populateDisneyCharacters(0, filter);
  }

  populateDisneyCharacters(page, filter) {
    return new Promise((resolve) => {
      if (page > 0) {
        this.getDisneyCharacters(page).subscribe((resp) => {
          // display its headers
          const keys = resp.headers.keys();
          let newData;
          this.headers = keys.map((key) => `${key}: ${resp.headers.get(key)}`);

          this.config = { ...resp.body! };
          this.config.data.forEach((item) =>
            console.log('populateDisneyCharacters', item)
          );
          newData = this.allCharacters = this.config.data;

          if (filter) newData = this.filterCharacters(filter);
          resolve({
            disneyCharacters: newData,
            totalPages: this.config.totalPages,
          });
        });
      } else {
        resolve({
          disneyCharacters: this.filterCharacters(filter),
        });
      }
    });
  }

  private filterCharacters(filter) {
    let newData = [];
    this.allCharacters.forEach((chtr) => {
      if (chtr.name.toLowerCase().includes(filter)) newData.push(chtr);
      else {
        for (let key in chtr) {
          let val = chtr[key];
          if (Array.isArray(val) && val.length > 0) {
            let combStr = val.join(',');
            if (combStr.toLowerCase().includes(filter.toLowerCase())) {
              console.log(combStr, filter);
              newData.push(chtr);
              break;
            }
          }
        }
      }
    });
    return newData;
  }
}
