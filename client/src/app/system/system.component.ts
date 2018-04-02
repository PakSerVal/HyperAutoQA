import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
})

export class SystemComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
