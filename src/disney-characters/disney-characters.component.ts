import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { DisneyCharactersService } from './disney-characters.service';

@Component({
  selector: 'disney-characters',
  templateUrl: './disney-characters.component.html',
  providers: [DisneyCharactersService],
})
export class DisneyCharactersComponent implements OnChanges {
  disneyCharacters;
  totalPages;

  @Input() page: number = 1;
  @Input() filter: string;
  @Output() sendTotalPages = new EventEmitter<number>();

  constructor(private disneyCharacterService: DisneyCharactersService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page']) {
      this.populateDisneyCharacters(this.page, this.filter);
    }
    if (changes['filter']) {
      this.filter = changes['filter'].currentValue;
      this.populateDisneyCharacters(0, this.filter);
    }
  }

  populateDisneyCharacters(page, filter) {
    this.disneyCharacterService
      .populateDisneyCharacters(page, filter)
      .then((data: any) => {
        if (data.totalPages) this.totalPages = data.totalPages;
        this.disneyCharacters = data.disneyCharacters;

        this.sendTotalPages.emit(this.totalPages);
        return data.disneyCharacters;
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
    this.populateDisneyCharacters(1, this.filter);
  }
}
