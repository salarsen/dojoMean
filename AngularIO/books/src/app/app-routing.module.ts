import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookComponent } from './books/book.component';
import { BookNewComponent } from './books/new/book-new.component';
import { BookDetailComponent } from './books/detail/book-detail.component';
import { BookTableComponent } from './books/table/book-table.component'

const routes : Routes = [
    {
        path : '',
        // component : BookComponent,
        children : [
            {
                path: 'new',
                component: BookNewComponent
            },
            {
                path: 'books/:id',
                component: BookDetailComponent,
            },
            {
                path : 'list',
                component : BookTableComponent,
            },
            {
                path : '**',
                redirectTo : 'list',
                pathMatch : 'full',
            }
        ]
    },
    
];

@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports : [RouterModule]
})

export class AppRoutingModule {}
