import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DisneyCharactersComponent } from '../disney-characters/disney-characters.component';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { SearchComponent } from '../search/search.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    DisneyCharactersComponent,
    PageNavComponent,
    SearchComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
