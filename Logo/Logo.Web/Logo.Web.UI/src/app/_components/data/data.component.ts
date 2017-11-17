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

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  model: any = {};
  loading = false;
  currentUser: UserInfoWithToken;
  folders: Folder[] = [];
  files: File[] = [];
  uploadFiles: any[];
  folderId: string;

  private sub: Subscription;

  constructor(private dataService: DataService,
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params
      .switchMap(params => {
        this.folderId = params['folderId'];

        return this.dataService.loadRootFolders(this.folderId);
      })
      .subscribe(res => this.folders = res);
  }

  
      //this.loadRootFiles();


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
      this.loading = true;
      this.homeService.createfolder(this.model.foldername, null)
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

  moveToSelectedFolder(folderId) {
      this.router.navigate(['', folderId])
  }
}
