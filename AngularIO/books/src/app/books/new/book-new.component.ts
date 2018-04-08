import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BookService } from '../../book.service';

import { Book } from '../../book';

@Component({
    selector: 'book-new',
    templateUrl: './book-new.component.html',
})

export class BookNewComponent {
    book : Book = new Book();
    
    @Output()
    addBook = new EventEmitter<Book>();
    
    constructor(
        private bookService:BookService,
    ) {}

    // onSubmit(event : Event, book : Book){
    onSubmit(event: Event, form: NgForm): void {
        event.preventDefault();

        this.bookService.createBook(form.value)
            .subscribe(book=> {
                this.addBook.emit(book);
                this.book = new Book();
                form.reset();
            }, error => {
                console.log(`Errors creating book: ${error}`);
                //display messages to user
            });
        console.log(`We submitted a form`);
    }
}