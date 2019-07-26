import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DataService } from '../../../data/data.service';
import { User } from '../../../data/user';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  postError = false;
  postErrorMessage = '';
  private users: Observable<User[]>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myUsers();

  }

  myUsers() {
    this.users = this.route.paramMap.pipe(
      switchMap(params => {
       return this.dataService.getUsers();
      })
    );
  }

  deleteUser(id) {
    this.dataService
    .deleteUser(id)
    .subscribe(
      result => console.log('success: ', result),
      error =>  this.onHttpError(error)
    );
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

}
