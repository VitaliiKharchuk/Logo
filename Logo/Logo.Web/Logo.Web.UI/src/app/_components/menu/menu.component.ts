import { Component, OnInit } from '@angular/core';

import { UserInfoWithToken, UserInfo } from '../../_models/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: UserInfo;

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

}
