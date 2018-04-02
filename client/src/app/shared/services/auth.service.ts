import {User} from '../models/user';

export class AuthService {

  private isAuthenticated = false;

  login(token: string, user: User) {
    this.isAuthenticated = true;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
