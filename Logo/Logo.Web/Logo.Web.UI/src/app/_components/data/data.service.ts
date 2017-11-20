import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Folder } from '../home/folder';
import { FolderNameWithParentFolderId } from '../home/folderNameWithParentFolderId';


@Injectable()
export class DataService {

  constructor(private http: Http) { }
  
    createfolder(folderName: string, parentFolderId: string) {
      let folderNameWithParentFolderId: FolderNameWithParentFolderId = {
        name: folderName,
        parentObjectId: parentFolderId,
      };
  
      return this.http.post('/api/folders/add-folder', folderNameWithParentFolderId, this.jwt()).map((response: Response) => response.json());
    }
  
    loadRootFolders(id: string) {
      return this.http.get('api/folders/get-folders/' + id, this.jwt()).map((response: Response) => response.json());
    }
  
    loadRootFiles(id: string) {
      return this.http.get('api/folders/get-files/' + id, this.jwt()).map((response: Response) => response.json());
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

