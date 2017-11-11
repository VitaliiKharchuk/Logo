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
  folder: Folder;
  folders: Folder[] = [];
  file: File;
  files: File[] = [];
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

        return this.dataService.loadAllFolders(this.folder.folderId);
      })
      .subscribe(res => this.folders = res);
  }

  private loadAllFolders(folderId: string) {
    this.dataService.loadAllFolders(folderId).subscribe(
      data => {
        this.folders = data.json() as Folder[];
        console.log('Loading folders successfull');
      },
      error => {
        //show info about error
        console.log('Loading folders unsuccessfull');
      });

  }

  createfolder() {
    this.loading = true;
    this.homeService.createfolder(this.model.foldername, null)
      .subscribe(
      data => {
        console.log('Creating folder successfull');
        this.closeModal();
        this.loadAllFolders(this.folderId);
      },
      error => {
        console.log('Cant create folder');
        this.loading = false;
      });

  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
