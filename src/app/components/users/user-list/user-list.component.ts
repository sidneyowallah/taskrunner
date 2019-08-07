import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data/data.service';
import { User } from '../../../data/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  postError = false;
  postErrorMessage = '';
  users: User[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getUsers();

  }

  getUsers() {
    this.dataService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error =>  this.onHttpError(error)
    );
  }

  deleteUser(id) {
    debounce(() => {
      this.dataService
        .deleteUser(id)
        .subscribe(
          result => console.log('success: ', result),
          error => this.onHttpError(error)
        );
    }, 250, false)();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

}

function debounce(func, wait, immediate){
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later =  () => {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait)
    if (callNow) { func.apply(context, args); }
  };
};
