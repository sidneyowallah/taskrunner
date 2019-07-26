import { TestBed, async, inject, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserListComponent } from './user-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { of } from 'rxjs/operators';

describe('UserListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        UserListComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    let fixture = TestBed.createComponent(UserListComponent);
    let component = fixture.componentInstance;
    let de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


// describe('UserListComponent', () => {
//   let component: UserListComponent;
//   let USERS;

//   beforeEach(() => {
//     USERS =[
//       { id: 1, userName: 'SidneyOwallah1' },
//       { id: 2, userName: 'SidneyOwallah2' },
//       { id: 3, userName: 'SidneyOwallah3' },
//       { id: 4, userName: 'SidneyOwallah4' },
//       { id: 5, userName: 'SidneyOwallah5' }
//     ]

//     let mockDataService = jasmine.createSpyObj(['myUsers', 'deleteUser']);

//     component = new UserListComponent(mockDataService);
//   })

//   describe('delete', () =>{
//     it('should remove the indicated user from the user list', () => {
//       mockDataService.deleteUser.and.returnValue(of(true))
//       component.users = USERS;
//       component.delete(USERS[2]);
//       expect(component.users.length).toBe(4)
//     })
//   })



})
