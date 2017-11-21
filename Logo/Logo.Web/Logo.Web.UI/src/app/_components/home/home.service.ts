import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Folder } from './folder';
import { FolderNameWithParentFolderId } from './folderNameWithParentFolderId';
import { UpdatedObject } from './updatedObject';
import { Observable } from "rxjs/Rx"

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  //menu
  createfolder(folderName: string, parentFolderId: string) {
    let folderNameWithParentFolderId: FolderNameWithParentFolderId = {
      name: folderName,
      parentObjectId: parentFolderId,
    };
    return this.http.post('/api/folders/add-folder', folderNameWithParentFolderId, this.jwt()).map((response: Response) => response.json());
  }

  //folders
  renameFolder(folderName: string, FolderId: string) {
    let updatedObject: UpdatedObject = {
      objectId: FolderId,
      updatedName: folderName,
    };

    return this.http.post('/api/folders/rename-folder', updatedObject, this.jwt()).map((response: Response) => response.json());
  }

  addTags(folderId: string, tags: string) {
    let tagsWithFolderId: FolderNameWithParentFolderId = {
      name: tags,
      parentObjectId: folderId,
    };

    return this.http.post('/api/folders/add-tags-folder', tagsWithFolderId, this.jwt()).map((response: Response) => response.json());
  }

  deleteFolder(selectedId: string) {
    return this.http.get('/api/folders/delete-folder/' + selectedId, this.jwt()).map((response: Response) => response.json());
  }

  //files
  renameFile(fileName: string, FolderId: string) {
    let updatedObject: UpdatedObject = {
      objectId: FolderId,
      updatedName: fileName,
    };

    return this.http.post('/api/folders/rename-file', updatedObject, this.jwt()).map((response: Response) => response.json());
  }

  deleteFile(selectedId: string) {
    return this.http.get('/api/folders/delete-file/' + selectedId, this.jwt()).map((response: Response) => response.json());
  }

  addTagsFile(fileId: string, tags: string) {
    let tagsWithFolderId: FolderNameWithParentFolderId = {
      name: tags,
      parentObjectId: fileId,
    };

    return this.http.post('/api/folders/add-tags-file', tagsWithFolderId, this.jwt()).map((response: Response) => response.json());
  }


  //initial requests
  loadRootFolders(id: string) {
    return this.http.get('api/folders/get-root-folders/', this.jwt()).map((response: Response) => response.json());
  }

  loadRootFiles(id: string) {
    return this.http.get('api/folders/get-root-files/', this.jwt()).map((response: Response) => response.json());
  }

  loadFolders(id: string) {
    return this.http.get('api/folders/get-folders/' + id, this.jwt()).map((response: Response) => response.json());
  }

  loadFiles(id: string) {
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
