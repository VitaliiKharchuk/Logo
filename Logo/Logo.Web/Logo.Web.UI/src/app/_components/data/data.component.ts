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
    selectedFolderId: string;
    selectedFileId: string;
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

    private loadFolders(folderId: string) {
        this.homeService.loadFolders(this.folderId).subscribe(
            data => {
                this.folders = data as Folder[];
                localStorage.setItem('folders', JSON.stringify(data))
                console.log('Loading folders successfull datac', this.folderId);
            },
            error => {
                //show info about error
                console.log('Loading folders unsuccessfull datac', this.folderId);
            });

    }

    private loadFiles(folderId: string) {
        this.homeService.loadFiles(this.folderId).subscribe(
            data => {
                this.files = data as File[];
                localStorage.setItem('files', JSON.stringify(data))
                console.log('Loading files successfull datac', this.folderId);
            },
            error => {
                //show info about error
                console.log('Loading files unsuccessfull datac', this.folderId);
            });

    }

    createfolder() {
        console.log('Creating folder in datac', this.model.foldername, this.folderId);
        this.homeService.createfolder(this.model.foldername, this.folderId)
            .subscribe(
            data => {
                console.log('Creating folder successfull');
                this.closeCreateFolderModal.nativeElement.click();
                this.loadFolders(this.folderId);
            },
            error => {
                this.loadFolders(this.folderId);
                console.log('Cant create folder');
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
                this.loadFolders(this.folderId);
            },
            error => {
                this.loadFolders(this.folderId);
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
                this.loadFolders(this.folderId);
            },
            error => {
                this.closeDeleteFolderModal.nativeElement.click();
                console.log('Cant delete folder');
                this.loadFolders(this.folderId);
            });
    }

    addTags() {
        let folderId = this.selectedFolderId;
        this.homeService.addTags(folderId, this.model.tags)
            .subscribe(
            data => {
                console.log('Add tags successfull');
                this.closeAddTagFolderModal.nativeElement.click();
                this.loadFolders(this.folderId);
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
        console.log('navigate to', folderId)
        console.log('moving ', this.route.snapshot, folderName);
        this.route.snapshot.data.breadcrumb = folderName;
    }
}
