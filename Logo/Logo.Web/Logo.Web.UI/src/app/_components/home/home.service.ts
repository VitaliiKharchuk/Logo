import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Folder } from './folder';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  createfolder(folder: Folder) {
    return this.http.post('/api/folders/create-folder', folder, this.jwt()).map((response: Response) => response.json());
  }
  
  loadRootFolders() {
    return this.http.post('api/folder/get-root-folders', this.jwt()).map((response: Response) => response.json());
  }
  
  

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
