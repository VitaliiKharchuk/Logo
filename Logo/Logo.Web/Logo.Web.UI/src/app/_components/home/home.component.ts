import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { Folder } from './folder';
import { File } from './file';
import { UserInfoWithToken } from '../login/user';
import { HomeService } from './home.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    model: any = {};
    loading = false;
    currentUser: UserInfoWithToken;
    folders: Folder[] = [];
    files: File[] = [];
    uploadFiles: any[];
    

    constructor(private homeService: HomeService,
        private router: Router,) {
    }

    ngOnInit() {
        this.loadRootFolders();
    }

    
    
      onChange(files: any[]) {
        this.uploadFiles = files;
      }

    private loadRootFolders() {
        this.homeService.loadRootFolders().subscribe(
            data => {
                this.folders = data.json() as Folder[];
                console.log('Loading root folders successfull');
            },
            error => {
                //show info about error
                console.log('Loading root folders unsuccessfull');
            });

    }

    createfolder() {
        this.loading = true;
        this.homeService.createfolder(this.model.foldername)
            .subscribe(
            data => {
                console.log('Creating folder successfull');
                this.closeModal();
                this.loadRootFolders();
            },
            error => {
                console.log('Cant create folder');
                this.loading = false;
            });

    }

    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }

    moveToSelectedFolder(folderId){
            this.router.navigate(['', folderId])
    }
}
