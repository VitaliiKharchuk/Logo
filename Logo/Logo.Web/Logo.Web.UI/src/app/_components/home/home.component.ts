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
    @ViewChild('closeCreateFolderModal') closeCreateFolderModal: ElementRef;
    @ViewChild('closeUploadFileModal') closeUploadFileModal: ElementRef;
    @ViewChild('closeRenameFolderModal') closeRenameFolderModal: ElementRef;
    @ViewChild('closeAddTagFolderModal') closeAddTagFolderModal: ElementRef;
    @ViewChild('closeDeleteFolderModal') closeDeleteFolderModal: ElementRef;
    @ViewChild('closeRenameFileModal') closeRenameFileModal: ElementRef;
    @ViewChild('closeAddTagFileModal') closeAddTagFileModal: ElementRef;
    @ViewChild('closeDeleteFileModal') closeDeleteFileModal: ElementRef;

    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
    model: any = {};
    currentUser: UserInfoWithToken;
    folders: Folder[] = [];
    files: File[] = [];
    uploadFiles: any[];
    selectedFolderId: string;
    selectedFolderName: string;
    selectedFileId: string;
    tags: string;
    grid: true;
    folderrenamem: any = {};

    constructor(private homeService: HomeService,
        private router: Router,
        private route:ActivatedRoute ) {
    }

    ngOnInit() {
        this.loadRootFolders();
        this.loadRootFiles();
        this.grid = true;
    }

    onChange(files: any[]) {
        this.uploadFiles = files;
    }

    checkIfImage(name: string) {
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
        this.homeService.createfolder(this.model.foldername, null)
            .subscribe(
            data => {
                console.log('Creating folder successfull', data);
                this.closeCreateFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.loadRootFolders();
                console.log('Cant create folder', error);
                this.closeCreateFolderModal.nativeElement.click();
            });

    }

    renamefolder() {
        let folderId = this.selectedFolderId;
        console.log(this.folderrenamem.name, folderId);
        this.homeService.renameFolder(this.folderrenamem.name, folderId)
            .subscribe(
            data => {
                console.log('Renaming folder successfull for ', folderId); 
                this.closeRenameFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.loadRootFolders();
                this.closeRenameFolderModal.nativeElement.click();
                console.log('Cant rename folderfor ', folderId);
            });
    }

    deleteFolder() {
        let folderId = this.selectedFolderId;
        this.homeService.deleteFolder(folderId)
            .subscribe(
            data => {
                console.log('Delete folder successfull');
                this.closeDeleteFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.closeDeleteFolderModal.nativeElement.click();
                console.log('Cant delete folder');
                this.loadRootFolders();
            });
    }

    addTags() {
        let folderId = this.selectedFolderId;
        this.homeService.addTags(folderId, this.model.tags)
            .subscribe(
            data => {
                console.log('Add tags successfull');
                this.closeAddTagFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.closeAddTagFolderModal.nativeElement.click();
                console.log('Cant add tags');
            });
    }


    openRenameFolderModal(folderId: string) {
        document.getElementById("openRenameFolderModalButton").click();
        console.log('modal for rename open ', folderId);
        this.selectedFolderId = folderId;
    }

    openAddTagFolderModal(folderId: string) {
        document.getElementById("openAddTagFolderModalButton").click();
        console.log('modal for add tag open ', folderId);
        this.selectedFolderId = folderId;
    }

    callDownloadZIP(folderId: string) {

    }

    openDeleteFolderModal(folderId: string) {
        document.getElementById("openDeleteFolderModalButton").click();
        console.log('modal for deleting open ', folderId);
        this.selectedFolderId = folderId;
    }

    //files
    openRenameFileModal(fileId: string) {
        document.getElementById("openRenameFileModalButton").click();
        console.log('modal for rename open ', fileId);
        this.selectedFileId = fileId;
    }

    openAddTagFileModal(fileId: string) {
        document.getElementById("openAddTagFileModalButton").click();
        console.log('modal for add tag open ', fileId);
        this.selectedFileId = fileId;
    }

    callDownload(fileId: string) {

    }

    openDeleteFileModal(fileId: string) {
        document.getElementById("openDeleteFileModalButton").click();
        console.log('modal for deleting open ', fileId);
        this.selectedFileId = fileId;
    }

    toggleGrid(res) {
        this.grid = res;
    }

    private closeModal(closeBtn: ElementRef): void {
        //this.closeBtn.nativeElement.click();
    }

    
    moveToSelectedFolder(folderId, folderName) {
        this.router.navigate(['', folderId]);
        console.log('moving ',this.route.snapshot, folderName);
        
        this.route.snapshot.data.breadcrumb = folderName;
    }
}
