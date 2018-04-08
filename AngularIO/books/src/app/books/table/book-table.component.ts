import { Component, OnInit, Input } from '@angular/core';
import { TitlizePipe } from '../../titlize.pipe';

import { Book } from '../../book'
// import { BOOKS } from '../../data/book-data';

import { BookService } from '../../book.service';

@Component({
    selector: 'book-table',
    templateUrl: './book-table.component.html',
    providers: [TitlizePipe]
})

export class BookTableComponent implements OnInit { 
    books: Array<Book> = [];
    selectedBook : Book;
    errorMessage : string;

    constructor(
        private bookService : BookService,
        private titlize: TitlizePipe
    ) {}

    ngOnInit(): void {
        this.bookService.getBooks()
            .subscribe(books =>{
                console.log(books);
                this.books = books;
                this.TitleCaseAuthors();
            }, error => {
                console.log(`There was an error: ${ error }`);
            })
        this.TitleCaseAuthors();
    }

    TitleCaseAuthors(): void {
        this.books.forEach(book => {
            book.author = this.titlize.transform(book.author);
        });
    }
    
    addBook(book: Book): void {
        this.books.push(book);
    }

    selectBook(book:Book) : void {
        console.log(book);
        
        this.selectedBook = (this.selectedBook === book) ? null : book;
    }

    removeBook(event : Event, book:Book) : void {
        event.stopPropagation();
        console.log(book);

        this.bookService.removeBook(book)
            .subscribe(result => {
                // console.log(`return data ${ result }`);
                if (this.books.includes(book)){
                    this.books.splice(this.books.indexOf(book),1)
                }
                
                if (this.selectedBook === book){
                    this.selectBook(book);
                }
            }, errorResponse => {
                console.log(errorResponse);
                this.errorMessage = errorResponse.json();
            });
    }
}
