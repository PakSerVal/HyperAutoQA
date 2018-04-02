import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {AuthService} from '../../shared/services/auth.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  title = 'Вход в ситему';

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['canLogin']) {
          this.title = 'Теперь вы можете войти в систему';
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.login(formData.email, formData.password)
      .subscribe((data) => {
        if (data) {
          this.authService.login(data.token, data.user);
          this.router.navigate(['/system', 'questions']);
        }
      },
          error => {
        console.log(error);
        switch (error.status) {
          case 404: {
            this.alertService.error('Такой пользователь не найден!');
            break;
          }
          case 401:
            this.alertService.error('Неверный пароль!');
        }
      });
  }
}
