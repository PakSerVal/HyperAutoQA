import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {UsersService} from '../../shared/services/users.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private alertService: AlertService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersService.registrate(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            canLogin: true
          }
        });
      },
        () => {
          this.alertService.error('Пользователь с таким email уже существует!');
        });
  }

}
