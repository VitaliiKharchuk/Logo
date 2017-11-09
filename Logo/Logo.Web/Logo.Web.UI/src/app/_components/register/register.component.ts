import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService, AuthentificationService } from '../../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authentificationService: AuthentificationService,
    private alertService: AlertService) { }



  register() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loading = true;
    this.authentificationService.addUser(this.model.name, this.model.email, this.model.password)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        //this.alertService.success('Registration successful', true);
        console.log('AddingUser succesfull');
        this.authentificationService.login(this.model.username, this.model.password)
          .subscribe(
          data => {
            console.log('Login succesfull');
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log('Login unsuccesfull');
            this.alertService.error(error);
            this.loading = false;
          });
      },
      error => {
        console.log('AddingUser unsuccesfull');
        this.alertService.error(error);
        this.loading = false;
      });
  }
}