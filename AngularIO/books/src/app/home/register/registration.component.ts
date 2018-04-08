import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

import { User } from '../../user';

@Component({
    selector: 'books-registration',
    templateUrl: './registration.component.html',
})

export class RegistrationComponent {
    user : User = new User();

    registrationErrors : string[] = [];

    constructor(private auth: AuthService, private router: Router){}

    onSubmit(): void {        
        this.auth.register(this.user)
            .then(() => this.router.navigate(['books']))
            .catch(response => this.handleErrors(response.json()));
    }

    private handleErrors(errors: string[] | Error): void{
        this.registrationErrors = Array.isArray(errors) ? errors : [errors.message];
    }
}