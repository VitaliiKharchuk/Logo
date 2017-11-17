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
    console.log(userInfoWithToken);
    console.log(userInfoWithToken.userInfo);
    console.log(this.currentUser);
  }

  ngOnInit() {

  }

  toggleGrid(): void {
    this.grid = true;
    this.toggleGridEvent.emit(true);
    console.log('togg');
  }

  toggleList(): void {
    this.grid = false;
    this.toggleGridEvent.emit(false);
    console.log('togl');
  }
}
