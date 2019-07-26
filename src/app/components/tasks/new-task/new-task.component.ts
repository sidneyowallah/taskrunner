import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../../data/data.service';
import { Task } from '../../../data/task';
import { User } from '../../../data/user';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faSave, faBan, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskForm: FormGroup;
  taskData: Task[];
  private users: Observable<User[]>;
  submitted = false;

  postError = false;
  postErrorMessage = '';

  faTrash = faTrash;
  faPlus = faPlus;
  faSave = faSave;
  faBan = faBan;
  faEdit = faEdit;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,


  ) { library.add(faTrash, faPlus, faSave, faBan, faEdit); }

  ngOnInit() {
    this.myUsers();
    this.taskForm = this.formBuilder.group({
      taskName: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
  }

  get myForm() {
    return this.taskForm.controls;
  }

  myUsers() {
    this.users = this.route.paramMap.pipe(
      switchMap(params => {
       return this.dataService.getUsers();
      })
    );
  }


  onSubmit() {
    this.submitted = true;
    if (!this.taskForm.valid) {
      return false;
    } else {
      this.dataService.createTask(this.taskForm.value)
        .subscribe(result => {
          console.log('success: ', result),
          this.router.navigate(['/tasks']);
          this.resetForm();
        },
        error =>  this.onHttpError(error));
    }
  }

  resetForm() {
    this.taskForm.reset();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

}
