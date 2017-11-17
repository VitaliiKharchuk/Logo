import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Folder } from './folder';
import { FolderNameWithParentFolderId } from './folderNameWithParentFolderId';
import { UpdatedObject } from './updatedObject';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  createfolder( folderName: string, parentFolderId: string ) {
    let folderNameWithParentFolderId: FolderNameWithParentFolderId = {
      name: folderName,
      parentId: parentFolderId, 
    };
    return this.http.post('/api/folders/add-folder', folderNameWithParentFolderId, this.jwt()).map((response: Response) => response.json());
  }

  deleteFolder(selectedId: string){
    return this.http.get('/api/folders/delete-folder/' + selectedId, this.jwt()).map((response: Response) => response.json());
  }

  addTags(folderId: string, tags: string){
    let tagsWithFolderId: FolderNameWithParentFolderId = {
      name: tags,
      parentId: folderId,
    };

    return this.http.post('/api/folders/add-tags-folder', tagsWithFolderId, this.jwt()).map((response: Response) => response.json());
  }

  loadRootFolders(id: string) {
    return this.http.get('api/folders/get-root-folders/', this.jwt()).map((response: Response) => response.json());
  }

  loadRootFiles(id: string) {
    return this.http.get('api/folders/get-files/' + id, this.jwt()).map((response: Response) => response.json());
  }

  renameFolder(folderName: string, FolderId: string) {
    let updatedObject: UpdatedObject = {
      objectId: FolderId,
      updatedName: folderName,
    };

    console.log( updatedObject.updatedName,  updatedObject.objectId);
    return this.http.post('/api/folders/rename-folder', updatedObject, this.jwt()).map((response: Response) => response.json());
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
