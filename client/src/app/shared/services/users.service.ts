import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../core/base.service';
import {User} from '../models/user';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService extends BaseService {

  httpOptions = {
    headers: new Headers({'Content-Type': 'application/json',})
  };

  constructor(private http: Http) {
    super();
  }

  registrate(user: User): Observable<any> {
    return this.http.post(this.getUrl('/users'), user, this.httpOptions)
      .map((response: Response) => response.json());
  }

  login(email: string, password: string): Observable<{token: string, user: User}> {
    const body = {email: email, password: password};
    return this.http.post(this.getUrl('/tokens'), body, this.httpOptions)
      .map(
        (response: Response) => {
          const data = response.json();
          const user = new User(data.email, null, data.username, data.id);
          return {token: data.token, user: user};
        }
      );
  }
}
