import { TestBed, ComponentFixture, async,} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NewUserComponent } from './new-user.component';
import { User } from 'src/app/data/user';
import { DataService } from './../../../data/data.service';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let mockDataService;
  let USERS;

  beforeEach(async(() => {

    USERS = [
      { id: 1, userName: 'sidneyowallah1' },
    ],

    mockDataService = jasmine.createSpyObj(['createUser']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ NewUserComponent ],
      providers: [  { provide: DataService, useValue: mockDataService },  FormBuilder],
      schemas: [  NO_ERRORS_SCHEMA ],
    });

    fixture = TestBed.createComponent(NewUserComponent);
    de = fixture.debugElement;
    el = de.nativeElement;
    component = fixture.componentInstance;
    component.ngOnInit();

  }));


  it('should have a h3 Add New User title', () => {
    de = fixture.debugElement.query(By.css('h3'));
    expect(de.nativeElement.textContent).toEqual('Add New User');
  });

  it('New User Form should be invalid when empty', () => {
    expect(component.newUserForm.valid).toBeFalsy();
  });

  it('Username field should be invalid when empty', () => {
    let username = component.newUserForm.controls.userName;
    expect(username.valid).toBeFalsy();

    let errors = {};
    errors = username.errors || {};
    expect(errors.required).toBeTruthy();

    // username.setValue('test');
    // errors = username.errors || {};
    // expect(errors.pattern).toBeTruthy();
  });

  // it('Should call the onSubmit method', () => {

  //   expect(component.newUserForm.valid).toBeFalsy();
  //   component.newUserForm.controls.userName.setValue('testUser1');
  //   expect(component.newUserForm.valid).toBeTruthy();


  //   // let user: User;
  //   // mockDataService.createUser.subscribe((data) => user = data);
  //   // component.onSubmit();
  //   // expect(user.userName).toBe('testUser1');

  //   component.submitted.subscribe(({ userName }) => {
  //     expect(userName).toEqual(userName);
  //   });

  //   element.querySelector('button[type="submit"]').click();



  // });

  it(`will notify on direct onSubmit() Call`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));



});
