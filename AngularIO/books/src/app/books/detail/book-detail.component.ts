import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../../book.service';

import { Book } from '../../book';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'book-detail',
    templateUrl: './book-detail.component.html',
})

export class BookDetailComponent implements OnInit {
    @Input()
    book: Book;

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private bookService : BookService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.switchMap(params => {
            return this.bookService.getBook(params.get('id'));
        })
        .subscribe(book => {
            console.log(`got book ${book}`);

            this.book = book
        },
        error => {
            console.log('got an error',error);
        });
    }

}