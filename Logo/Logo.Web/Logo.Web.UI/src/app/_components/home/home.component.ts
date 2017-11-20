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
    selectedObjectId: string;
    selectedFolderName: string;
    tags: string;
    grid: true;
    folderrenamem: any = {};

    constructor(private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadRootFolders();
        this.loadRootFiles();
        if (JSON.parse(localStorage.getItem('grid')) === null) {
            this.grid = true;
        }
        else {
            this.grid = JSON.parse(localStorage.getItem('grid'));
        }
        console.log('h', this.grid)
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

    //initial
    private loadRootFolders() {
        this.homeService.loadRootFolders(null).subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Loading root folders successfull');
                }
                this.folders = data as Folder[];
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
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Loading root files successfull');
                }
            },
            error => {
                //show info about error
                console.log('Loading root files unsuccessfull');
            });

    }

    //menu
    createfolder() {
        this.homeService.createfolder(this.model.foldername, null)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Creating folder successfull', data);
                }
                this.closeCreateFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.loadRootFolders();
                console.log('Cant create folder', error);
                this.closeCreateFolderModal.nativeElement.click();
            });
    }

    //folders
    renamefolder() {
        let folderId = this.selectedObjectId;
        this.homeService.renameFolder(this.folderrenamem.name, folderId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Renaming folder successfull for ', folderId);
                }
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
        let folderId = this.selectedObjectId;
        this.homeService.deleteFolder(folderId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Delete folder successfull');
                }
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
        let folderId = this.selectedObjectId;
        this.homeService.addTags(folderId, this.model.tags)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Add tags successfull');
                }
                this.closeAddTagFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.closeAddTagFolderModal.nativeElement.click();
                console.log('Cant add tags');
            });
    }

    //files
    renameFile() {
        let fileId = this.selectedObjectId;
        console.log(this.model.renameFile, fileId);
        this.homeService.renameFolder(this.model.renameFile, fileId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Renaming file successfull for ', fileId);
                }
                this.closeRenameFileModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.loadRootFolders();
                this.closeRenameFileModal.nativeElement.click();
                console.log('Cant rename file for ', fileId);
            });
    }

    deleteFile() {
        let fileId = this.selectedObjectId;
        this.homeService.deleteFile(fileId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Delete file successfull');
                }
                this.closeDeleteFileModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.closeDeleteFileModal.nativeElement.click();
                console.log('Cant delete file');
                this.loadRootFolders();
            });
    }

    addTagsFile() {
        let fileId = this.selectedObjectId;
        this.homeService.addTagsFile(fileId, this.model.tags)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Add tags successfull');
                }
                this.closeAddTagFileModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.closeAddTagFileModal.nativeElement.click();
                console.log('Cant add tags');
            });
    }


    //folders
    openRenameFolderModal(folderId: string) {
        document.getElementById("openRenameFolderModalButton").click();
        console.log('modal for rename open ', folderId);
        this.selectedObjectId = folderId;
    }

    openAddTagFolderModal(folderId: string) {
        document.getElementById("openAddTagFolderModalButton").click();
        console.log('modal for add tag open ', folderId);
        this.selectedObjectId = folderId;
    }

    callDownloadZIP(folderId: string) {

    }

    openDeleteFolderModal(folderId: string) {
        document.getElementById("openDeleteFolderModalButton").click();
        console.log('modal for deleting open ', folderId);
        this.selectedObjectId = folderId;
    }

    //files
    openRenameFileModal(fileId: string) {
        document.getElementById("openRenameFileModalButton").click();
        console.log('modal for rename open ', fileId);
        this.selectedObjectId = fileId;
    }

    openAddTagFileModal(fileId: string) {
        document.getElementById("openAddTagFileModalButton").click();
        console.log('modal for add tag open ', fileId);
        this.selectedObjectId = fileId;
    }

    callDownload(fileId: string) {

    }

    openDeleteFileModal(fileId: string) {
        document.getElementById("openDeleteFileModalButton").click();
        console.log('modal for deleting open ', fileId);
        this.selectedObjectId = fileId;
    }

    toggleGrid(res) {
        this.grid = res;
    }

    moveToSelectedFolder(folderId, folderName) {
        this.router.navigate(['', folderId]);
        console.log('moving ', this.route.snapshot, folderName);

        this.route.snapshot.data.breadcrumb = folderName;
    }
}
