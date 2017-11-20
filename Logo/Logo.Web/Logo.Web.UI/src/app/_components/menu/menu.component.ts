import { Component, OnInit, Output, EventEmitter, } from '@angular/core';

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

  constructor(
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
