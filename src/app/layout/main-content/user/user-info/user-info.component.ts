import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userInfo: User;
  currentUser: any;
  username: string;
  constructor(private rest: RestService) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = storedUser;
    this.username = storedUser ? storedUser['user_name'] : storedUser;
    this.rest.currentUser.subscribe(user => {
      this.currentUser = user;
      this.username = user ? user.user_name : user;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.rest.getUser(this.username).subscribe(data => {
      this.userInfo = data;
      console.log('data', data);
    });
  }
}
