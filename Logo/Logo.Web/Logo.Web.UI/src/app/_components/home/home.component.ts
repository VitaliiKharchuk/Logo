import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { Folder } from './folder';
import { FileCustom } from './file';
import { UserInfoWithToken } from '../login/user';
import { HomeService } from './home.service';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NotificationsService } from 'angular2-notifications';


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

    @ViewChild("inputfiles") inputfiles;
    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
    model: any = {};
    currentUser: UserInfoWithToken;
    folders: Folder[] = [];
    files: FileCustom[] = [];
    uploadFiles: Array<any>;
    selectedObjectId: string;
    selectedFolderName: string;
    tags: string;
    grid: true;
    folderrenamem: any = {};
    public options = {
        position: ["bottom", "right"],
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        clickIconToClose: true,
        lastOnBottom: true
    }

    constructor(private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute,
        private notificationsService: NotificationsService) {
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
    }

    //initial
    private loadRootFolders() {
        this.homeService.loadRootFolders().subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                    this.pushErrorNotification('Загрузка папок прошла неуспешно' + data.message)
                }
                else {
                    console.log('Loading root folders successfull');
                    this.pushSuccessNotification('Загрузка папок прошла успешно')
                }
                this.folders = data as Folder[];
            },
            error => {
                //show info about error
                this.pushErrorNotification('Загрузка папок прошла неуспешно')
                console.log('Loading root folders unsuccessfull');
            });


    }

    private loadRootFiles() {
        this.homeService.loadRootFiles().subscribe(
            data => {
                this.files = data as FileCustom[];
                for (let file of this.files) {
                    if (this.checkIfJpg(file.name) == true) { 
                        file.resizedImage = 'data:image/jpg;base64,' + file.resizedImage; 
                    }
                    else {
                        file.resizedImage = 'data:image/png;base64,' + file.resizedImage;
                    }
                }
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
                    this.pushErrorNotification('Создание папки прошло неуспешно' + data.message)
                }
                else {
                    console.log('Creating folder successfull', data);
                    this.pushSuccessNotification('Создание папки прошло успешно')
                }
                this.closeCreateFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.loadRootFolders();
                console.log('Cant create folder', error);
                this.closeCreateFolderModal.nativeElement.click();
                this.pushErrorNotification('Создание папки прошло неуспешно')
            });
    }

    uploadFile() {
        let fi = this.inputfiles.nativeElement;
        for (var _i = 0; _i < fi.files.length; _i++) {

            let formData: FormData = new FormData();
            formData.append('FileContent', fi.files[_i]);
            formData.append('CreationDate', fi.files[_i].lastModifiedDate);
            formData.append('ParentFolderId', null);
            formData.append('Tags', this.uploadFiles[_i].hashtag);
            console.log('name file', fi.files[_i].name);

            this.homeService.uploadFile(formData)
                .subscribe(
                data => {
                    if (!data.success && data.message) {
                        console.log(data.message)
                        this.pushErrorNotification('Загрузка файла прошло неуспешно' + data.message)
                    }
                    else {
                        console.log('upload file success');
                        this.pushSuccessNotification('Загрузка файла прошло успешно')
                    }
                    this.closeUploadFileModal.nativeElement.click();
                    this.loadRootFiles();
                },
                error => {
                    this.loadRootFiles();
                    console.log('Cant upload file', error);
                    this.closeUploadFileModal.nativeElement.click();
                    this.pushErrorNotification('Загрузка файла прошло неуспешно')
                });
        }
    }

    //folders
    renamefolder() {
        let folderId = this.selectedObjectId;
        this.homeService.renameFolder(this.folderrenamem.name, folderId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                    this.pushErrorNotification('Переименование папки прошло неуспешно' + data.message)
                }
                else {
                    console.log('Renaming folder successfull for ', folderId);
                    this.pushSuccessNotification('Переименование папки прошло успешно')
                }
                this.closeRenameFolderModal.nativeElement.click();
                this.loadRootFolders();
            },
            error => {
                this.loadRootFolders();
                this.closeRenameFolderModal.nativeElement.click();
                console.log('Cant rename folderfor ', folderId);
                this.pushErrorNotification('Переименование папки прошло неуспешно')
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
        this.homeService.renameFile(this.model.renameFile, fileId)
            .subscribe(
            data => {
                if (!data.success && data.message) {
                    console.log(data.message)
                    this.pushErrorNotification('Переименование файла прошло неуспешно' + data.message)
                }
                else {
                    console.log('Renaming file successfull for ', fileId);
                    this.pushSuccessNotification('Переименование файла прошло успешно')
                }
                this.closeRenameFileModal.nativeElement.click();
                this.loadRootFiles()
            },
            error => {
                this.loadRootFiles()
                this.closeRenameFileModal.nativeElement.click();
                console.log('Cant rename file for ', fileId);
                this.pushErrorNotification('Переименование файла прошло неуспешно')
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
                this.loadRootFiles()
            },
            error => {
                this.closeDeleteFileModal.nativeElement.click();
                console.log('Cant delete file');
                this.loadRootFiles()
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
                this.loadRootFiles()
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
    }
    onChange(fileInput: any[]) {
        this.uploadFiles = fileInput;
        console.log(this.uploadFiles)
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

    checkIfJpg(name: string) {
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

    pushSuccessNotification(message: string, options?: any) {
        this.notificationsService.success('Ура!', message, options);
    }

    pushErrorNotification(message: string, options?: any) {
        this.notificationsService.error('Упс! У нас что-то сломалось', message, options);
    }
}
