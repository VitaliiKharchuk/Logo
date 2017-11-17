import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { Folder } from './folder';
import { File } from './file';
import { UserInfoWithToken } from '../login/user';
import { HomeService } from './home.service';
import { Observable } from 'rxjs/Observable';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
    model: any = {};
    currentUser: UserInfoWithToken;
    folders: Folder[] = [];
    files: File[] = [];
    uploadFiles: any[];
    selectedFolderId: string;
    tags: string;
    grid: true;
    folderrenamem: any = {};

    constructor(private homeService: HomeService,
        private router: Router,) {
    }

    ngOnInit() {
        this.loadRootFolders();
        this.loadRootFiles();
        this.grid = true;
    }

    onChange(files: any[]) {
        this.uploadFiles = files;
    }

    checkIfImage(name: string){
        var fileExtension = "";
        if (name.lastIndexOf(".") > 0) {
            fileExtension = name.substring(name.lastIndexOf(".") + 1, name.length);
        }
        if (fileExtension.toLowerCase() == "jpg") {
            return true;
        }
        if (fileExtension.toLowerCase() == "png") {
            return false;
        }
        else {
            return false;
        }
    }

    private loadRootFolders() {
        this.homeService.loadRootFolders(null).subscribe(
            data => {
                this.folders = data as Folder[];
                localStorage.setItem('folders', JSON.stringify(data))
                console.log('Loading root folders successfull');
            },
            error => {
                //show info about error
                console.log('Loading root folders unsuccessfull');
            });

    }

    private loadRootFiles() {
        this.homeService.loadRootFiles(null).subscribe(
            data => {
                this.files = data as File[];
                localStorage.setItem('files', JSON.stringify(data))
                console.log('Loading root files successfull');
            },
            error => {
                //show info about error
                console.log('Loading root files unsuccessfull');
            });

    }

    createfolder() {
        console.log('create folder', this.model.foldername);
        this.homeService.createfolder(this.model.foldername, null)
            .subscribe(
            data => {
                console.log('Creating folder successfull');
                this.closeModal();
                this.loadRootFolders();
            },
            error => {
                
                console.log('Cant create folder');
                this.closeModal();
            });

    }

    renamefolder(){
        let folderId = this.selectedFolderId;
        this.homeService.renameFolder(this.folderrenamem.name, folderId)
        .subscribe(
        data => {
            // console.log('Renaming folder successfull for ', folderId);
            // this.closeModal();
            // this.loadRootFolders();
        },
        error => {
            // this.closeModal();
            // console.log('Cant rename folderfor ', folderId);
        });
        this.closeModal();
    }

    deleteFolder(){
        let folderId = this.selectedFolderId;
        this.homeService.deleteFolder(folderId)
        .subscribe(
        data => {
            console.log('Delete folder successfull');
            this.closeModal();
            this.loadRootFolders();
        },
        error => {
            this.closeModal();
            console.log('Cant delete folder');
        });
    }

    addTags(){
        let folderId = this.selectedFolderId;
        this.homeService.addTags(folderId, this.model.tags)
        .subscribe(
        data => {
            console.log('Add tags successfull');
            this.closeModal();
            this.loadRootFolders();
        },
        error => {
            console.log('Cant add tags');
        });
    }

    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }

    moveToSelectedFolder(folderId) {
        this.router.navigate(['', folderId])
    }

    openRenameFolderModal(folderId: string){
        document.getElementById("openRenameFolderModalButton").click();
        console.log('modal for rename open ', folderId);
        this.selectedFolderId = folderId;
    }

    openAddTagFolderModal(folderId: string){
        document.getElementById("openAddTagFolderModalButton").click();
        console.log('modal for add tag open ', folderId);
        this.selectedFolderId = folderId;
    }

    callDownloadZIP(folderId: string){

    }

    openDeleteFolderModal(folderId: string){
        document.getElementById("openDeleteFolderModalButton").click();
        console.log('modal for deleting open ', folderId);
        this.selectedFolderId = folderId;
    }

    toggleGrid(res) {
        this.grid = res;
    }
}
