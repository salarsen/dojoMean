import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

import { User } from '../../user';

@Component({
    selector: 'books-login',
    templateUrl: './login.component.html',
})

export class LoginComponent {
    user: User = new User();

    constructor(private auth: AuthService, private router: Router){}

    onSubmit() : void {
        this.auth.login(this.user)
            .then(() => this.router.navigate(['books']))
            .catch(()=>{});
    }
}