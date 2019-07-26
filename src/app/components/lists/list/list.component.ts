import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DataService } from '../../../data/data.service';
import { List } from '../../../data/list';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  postError = false;
  postErrorMessage = '';
  private lists: Observable<List[]>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myLists();
  }

  myLists() {
    this.lists = this.route.paramMap.pipe(
      switchMap(params => {
       return this.dataService.getLists();
      })
    );
  }

  deleteList(id) {
    this.dataService
    .deleteList(id)
    .subscribe(
      result => console.log('success: ', result),
      error =>  this.onHttpError(error)
    );
    this.ngOnInit();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

}
