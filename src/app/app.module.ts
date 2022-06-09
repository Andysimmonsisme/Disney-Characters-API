import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DisneyCharactersComponent } from '../disney-characters/disney-characters.component';
import { DisneyCharactersService } from '../disney-characters/disney-characters.service';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { FilterComponent } from '../filter/filter.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    DisneyCharactersComponent,
    PageNavComponent,
    FilterComponent,
  ],
  providers: [DisneyCharactersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
