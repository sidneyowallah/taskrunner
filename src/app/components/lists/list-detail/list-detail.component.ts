import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../../../data/data.service';
import { List } from '../../../data/list';
import { Observable} from 'rxjs';
import { map, tap, flatMap} from 'rxjs/operators';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  postError = false;
  postErrorMessage = '';
  list: List[];
  // list: Observable<List[]>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getList(id);
  }


getList(id) {
  this.dataService.getList(id)
  .subscribe (
    data => {
      this.list = data
      console.log(this.list);
    },
    error =>  this.onHttpError(error)
  );
}

// getUser(id) {
//   this.dataService.getUser(id).subscribe(data => {
//     this.userForm.setValue({
//       id: data['id'],
//       userName: data['userName']
//     });

//     this.userData = data;
//     // console.log('data is ', this.userData.userName);
//   });
// }



  deleteList(id) {
      this.dataService
      .deleteList(id)
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

  backButton() {
    this.router.navigate(['/lists']);
  }

}
