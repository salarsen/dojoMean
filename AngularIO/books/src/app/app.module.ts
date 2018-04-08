import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookComponent } from './books/book.component';
import { BookNewComponent } from './books/new/book-new.component';
import { BookDetailComponent } from './books/detail/book-detail.component';
import { BookTableComponent } from './books/table/book-table.component';

import { AppRoutingModule } from './app-routing.module';

import { TitlizePipe } from './titlize.pipe';
import { BookService } from './book.service';

// TitlizePipe.skipWords = ['the'];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookNewComponent,
    BookTableComponent,
    BookDetailComponent,
    TitlizePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
