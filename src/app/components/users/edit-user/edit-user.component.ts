import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { DataService } from '../../../data/data.service';
import { User } from '../../../data/user';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faSave, faBan, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  userData: User[];
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
      this.updateUser();
      const id = this.route.snapshot.paramMap.get('id');
      this.getUser(id);
      this.userForm = this.formBuilder.group({
        id: [{value: '', disabled: true}],
        userName: [{value: '', disabled: true}, [Validators.required]],
      });
  }

  get myForm() {
    return this.userForm.controls;
  }

  getUser(id) {
    this.dataService.getUser(id).subscribe(data => {
      this.userForm.setValue({
        id: data['id'],
        userName: data['userName']
      });

      this.userData = data;
      // console.log('data is ', this.userData.userName);
    });
  }

  updateUser() {
    this.userForm = this.formBuilder.group({
      id: [''],
      userName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
        const id = this.route.snapshot.paramMap.get('id');
        this.dataService.updateUser(id, this.userForm.value)
          .subscribe(result => {
            console.log('success: ', result),
            this.router.navigate(['/users']);
          },
          error =>  this.onHttpError(error));
    }
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  editToggle = () => {
    const control = this.userForm;
    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }


}



