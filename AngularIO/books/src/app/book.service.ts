import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Book } from './book';

import 'rxjs/add/operator/map';

@Injectable()

export class BookService {
    
    public static base = '';

    constructor(private http: Http){}

    getBooks() : Observable<Book[]> {
        return this.http.get(BookService.base)
            .map(response => response.json());
    }

    removeBook(book : Book) : Observable<Book> {
        return this.http.delete(`${ BookService.base }/${ book._id}`)
            .map(response => response.json());
    }

    createBook(book : Book) : Observable<Book>{
        return this.http.post(BookService.base, book)
            .map(response => response.json());
    }

    getBook(id: string) : Observable<Book> {
        return this.http.get(`${BookService.base}/${id}`)
            .map(response => response.json());
    }
}
