import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';


@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }
  signup(user_to_login, gethash = null) {
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    const json = JSON.stringify(user_to_login);
    const params = json;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.url + 'login', params, { headers }).pipe(map(res => res));
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  register(userToRegister) {
    const params = JSON.stringify(userToRegister);

    const  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + 'register', params, { headers }).pipe(map(res => res));
  }


}
