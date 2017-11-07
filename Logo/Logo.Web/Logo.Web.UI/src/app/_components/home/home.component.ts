import { Component, OnInit } from '@angular/core';

import { Folder } from '../../_models/folder';
import { File } from '../../_models/file';
import { UserInfoWithToken } from '../../_models/user';
import { AuthentificationService } from '../../_services/index';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: UserInfoWithToken;
    folders: Folder[] = [];
    files: File[] = [];

    constructor(private authentificationService: AuthentificationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngOnInit() { 
        this.loadRootFolders();
    }

    private loadRootFolders() {
        this.authentificationService.post('api/folder/get-root-folders').subscribe(
            data => {
                this.folders = data.json() as Folder[];
                console.log('Loading root folders successfull');
            },
            error => {
                //show info about error
                console.log('Loading root folders unsuccessfull');
            });

    }

    private loadAllFolders(folderId) {
        this.authentificationService.post('api/folder/get-folder', folderId).subscribe(
            data => {
                this.folders = data.json() as Folder[];
                console.log('Loading folders successfull');
            },
            error => {
                //show info about error
                console.log('Loading folders unsuccessfull');
            });

    }
}