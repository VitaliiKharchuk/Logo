import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { UserCredentials, UserInfoWithToken, UserCredentialsWithName } from './user';

@Injectable()
export class AuthentificationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        let userCredentials: UserCredentials = {
            email: email,
            password: password
        };

        return this.http.post('/api/users/auth-token', userCredentials)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let userInfoWithToken = response.json();
                if (userInfoWithToken && userInfoWithToken.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userInfoWithToken));
                }

                return userInfoWithToken;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    addUser(name: string, email: string, password: string) {
        let userCredentialsWithName: UserCredentialsWithName = {
            name: name,
            email: email,
            password: password
        };

        return this.http.post('/api/users/add-user', userCredentialsWithName)
            .map((response: Response) => {
                // // login successful if there's a jwt token in the response
                // let userInfoWithToken = response.json();
                // if (userInfoWithToken && userInfoWithToken.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(userInfoWithToken));
                // }

                //return userInfoWithToken;
            });
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


    post(url: string, body?: any, options?: RequestOptions): Observable<Response> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser && !currentUser.token) {
            // log error
        }

        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        if (!options) {
            options = new RequestOptions();
        }

        options.headers = headers;

        return this.http.post(url, options);
    }

}