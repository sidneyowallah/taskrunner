import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { DataService } from '../../../data/data.service';
import { User } from '../../../data/user';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faSave, faBan, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;
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
  ) { library.add(faTrash, faPlus, faSave, faBan, faEdit);

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newUserForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
    });
  }

  get myForm() {
    return this.newUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.newUserForm.valid) {
      return false;
    } else {
      this.dataService.createUser(this.newUserForm.value).subscribe(
        result => {
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


}
