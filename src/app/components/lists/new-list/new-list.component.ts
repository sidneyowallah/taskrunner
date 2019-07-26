import { Component, OnInit } from '@angular/core';
import { List } from '../../../data/list';
import { Task } from '../../../data/task';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { DataService } from '../../../data/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faSave, faBan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  formSubmitted = true;

  listFormGroup: FormGroup;

  private tasks: Observable<Task[]>;
  faTrash = faTrash;
  faPlus = faPlus;
  faSave = faSave;
  faBan = faBan;

  clearedNewList: List = {
    id: null,
    listName: null,
    listDescription: null,
   tasks: null,
  };

  newList: List = { ...this.clearedNewList };
  postError = false;
  postErrorMessage = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) {
      library.add(faTrash, faPlus, faSave, faBan);
     }

  ngOnInit() {
    this.myListTasks();
    this.listFormGroup = this.formBuilder.group({
      id: [''],
      listName: ['', Validators.required],
      listDescription: ['', Validators.required],
      tasks: this.formBuilder.array([
        this.getTaskFormGroup()
      ])
    });
  }

  myListTasks() {
    this.tasks = this.route.paramMap.pipe(
      switchMap(params => {
       return this.dataService.getTasks();
      })
    );
  }

  addTask() {
    const tasksArray = this.listFormGroup.controls.tasks as FormArray;
    tasksArray.push(this.getTaskFormGroup());
  }
  deleteTask(index: number) {
    const tasksArray = this.listFormGroup.controls.tasks as FormArray;
    tasksArray.removeAt(index);
  }

  cancelEdit() {
     this.router.navigate(['/lists']);
  }

  getTaskFormGroup() {
    return this.formBuilder.group({
      task: ['', Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if ( this.listFormGroup.valid) {
      this.dataService.createList(this.listFormGroup.value).subscribe(
        result => console.log('success: ', result),
        error =>  this.onHttpError(error)
      );
      this.router.navigate(['/lists']);
      this.resetForm();
        } else {
      this.formSubmitted = false;
    }
  }

  resetForm() {
    this.listFormGroup.reset();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;

  }
}

