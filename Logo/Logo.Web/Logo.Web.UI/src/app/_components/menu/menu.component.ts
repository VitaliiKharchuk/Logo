import { Component, OnInit, Output, Input, EventEmitter, } from '@angular/core';
import { FolderNameWithParentFolderId } from '../home/folderNameWithParentFolderId';
import { HomeService } from '../home/home.service';
import { UserInfoWithToken, UserInfo } from '../login/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: UserInfo;
  @Output()
  toggleGridEvent = new EventEmitter<boolean>();
  grid = true;
  @Input() folderId: string;
  breadcrumbs: FolderNameWithParentFolderId[] = [];

  constructor(private homeService: HomeService,
  ) {
    let userInfoWithToken: UserInfoWithToken = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = userInfoWithToken.userInfo;
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('grid')) === null) {
      this.grid = true;
    }
    else {
      this.grid = JSON.parse(localStorage.getItem('grid'));
    }

    if (!(this.folderId === undefined)) {
      this.loadBreadcrumbs();
    }
  }

  ngOnChanges() {
    this.loadBreadcrumbs();
  }

  private loadBreadcrumbs() {
    this.homeService.loadBreadcrumbs(this.folderId).subscribe(
      data => {
        this.breadcrumbs = (data as FolderNameWithParentFolderId[]).reverse();
        if (!data.success && data.message) {
          console.log(data.message)
        }
        else {
          console.log('Loading bc successfull');
        }
      },
      error => {
        //show info about error
        console.log('Loading bc unsuccessfull');
      });
  }


  toggleGrid(): void {
    this.grid = true;
    this.toggleGridEvent.emit(true);
    localStorage.setItem('grid', JSON.stringify(this.grid))
  }

  toggleList(): void {
    this.grid = false;
    this.toggleGridEvent.emit(false);
    localStorage.setItem('grid', JSON.stringify(this.grid))
  }
}
