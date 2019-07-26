import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../data/data.service';
import { Task } from '../../../data/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  postError = false;
  postErrorMessage = '';

  myListFilter: string;
    get listFilter(): string {
      return this.myListFilter;
  }
  set listFilter(value: string) {
    this.myListFilter = value;
    this.filteredTasks = this.listFilter ? this.performFilter(this.listFilter) : this.tasks;
  }

  filteredTasks: Task[] = [];
  tasks: Task[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  performFilter(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: Task) =>
      task.taskStatus.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.myTasks();
  }

  myTasks() {
    this.dataService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      },
      error =>  this.onHttpError(error)
    );
  }

  deleteTask(id) {
    this.dataService
    .deleteTask(id)
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

  resetList() {
    this.ngOnInit();
  }

}
