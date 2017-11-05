import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserCredentials } from '../_models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: UserCredentials) {
    return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: UserCredentials) {
    return this.http.put('/api/users/' + user.email, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  get(url: string, options?: RequestOptions): Observable<Response> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser && !currentUser.token) {
      // log error
    }

    let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    if (!options) {
      options = new RequestOptions();
    }

    options.headers = headers;

    return this.http.get(url, options);
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}