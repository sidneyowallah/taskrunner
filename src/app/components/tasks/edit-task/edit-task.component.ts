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
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

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
    this.updateTask();
    const id = this.route.snapshot.paramMap.get('id');
    this.getTask(id);
    this.taskForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      taskName: [{value: '', disabled: true}, [Validators.required]],
      taskDescription: [{value: '', disabled: true}, [Validators.required]],
      taskStatus: [{value: '', disabled: true}, [Validators.required]],
      user: [{value: '', disabled: true}, [Validators.required]],
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


  getTask(id) {
    this.dataService.getTask(id).subscribe(data => {
      this.taskForm.setValue({
        id: data['id'],
        taskName: data['taskName'],
        taskDescription: data['taskDescription'],
        taskStatus: data['taskStatus'],
        user: data['user'],
      });
    });
  }

  updateTask() {
    this.taskForm = this.formBuilder.group({
      id: [''],
      taskName: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.taskForm.valid) {
      return false;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.dataService.updateTask(id, this.taskForm.value)
      .subscribe(result => {
        console.log('success: ', result),
        this.router.navigate(['/tasks']);
      },
      error =>  this.onHttpError(error));
      }
    }

  editToggle = () => {
    const control = this.taskForm;
    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
}
