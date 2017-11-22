import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { Folder } from '../home/folder';
import { File } from '../home/file';
import { UserInfoWithToken } from '../login/user';
import { DataService } from './data.service';
import { HomeService } from '../home/home.service';
import { Observable } from 'rxjs/Observable';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['../home/home.component.css']
})

export class DataComponent implements OnInit {
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
    tags: string;
    grid: true;
    folderrenamem: any = {};
    folderId: string;
    

    private sub: Subscription;

    constructor(private dataService: DataService,
        private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params
            .switchMap(params => {
                this.folderId = params['folderId'];
                console.log('ngOnInit datac', this.folderId)
                return this.homeService.loadFolders(this.folderId);
            })
            .subscribe(res => this.folders = res);
        if (JSON.parse(localStorage.getItem('grid')) === null) {
            this.grid = true;
        }
        else {
            this.grid = JSON.parse(localStorage.getItem('grid'));
        }
        this.loadFiles();
        
    }


    //this.loadRootFiles();

    // ngOnInit() {
    //     this.loadRootFolders();
    //     this.loadRootFiles();
    //     this.grid = true;
    // }

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
    private loadFolders() {
        this.homeService.loadFolders(this.folderId).subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Loading folders successfull');
                }
                this.folders = data as Folder[];
            },
            error => {
                //show info about error
                console.log('Loading folders unsuccessfull');
            });

    }

    private loadFiles() {
        this.homeService.loadFiles(this.folderId).subscribe(
            data => {
                this.files = data as File[];
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Loading files successfull');
                }
            },
            error => {
                //show info about error
                console.log('Loading files unsuccessfull');
            });

    }

    //menu
    createfolder() {
        this.homeService.createfolder(this.model.foldername, this.folderId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                }
                else {
                    console.log('Creating folder successfull', data);
                }
                this.closeCreateFolderModal.nativeElement.click();
                this.loadFolders();
            },
            error => {
                this.loadFolders();
                console.log('Cant create folder', error);
                this.closeCreateFolderModal.nativeElement.click();
            });
    }

    //folders
    renamefolder() {
        let folderId = this.selectedObjectId;
        console.log(this.folderrenamem.name, folderId);
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
                this.loadFolders();
            },
            error => {
                this.loadFolders();
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
                this.loadFolders();
            },
            error => {
                this.closeDeleteFolderModal.nativeElement.click();
                console.log('Cant delete folder');
                this.loadFolders();
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
                this.loadFolders();
            },
            error => {
                this.loadFolders();
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
                this.loadFiles();
            },
            error => {
                this.loadFiles();
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
                this.loadFiles();
            },
            error => {
                this.closeDeleteFileModal.nativeElement.click();
                console.log('Cant delete file');
                this.loadFiles();
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
                this.loadFiles();
            },
            error => {
                this.loadFiles();
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
    }
}
