import { ComponentFixture, TestBed} from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { DataService } from './../../../data/data.service';
import { Directive, Input, HostListener, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]'
})

// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }

}

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let mockDataService;
  let USERS;

  beforeEach(() => {

    USERS = [
      { id: 1, userName: 'sidneyowallah1' },
      { id: 2, userName: 'sidneyowallah2' },
      { id: 3, userName: 'sidneyowallah3' }
    ],

    mockDataService = jasmine.createSpyObj(['getUsers', 'deleteUsers']);

    TestBed.configureTestingModule({
      declarations: [UserListComponent, RouterLinkDirectiveStub],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(UserListComponent);

  });

  it('should have a h3 User List title', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    expect(de.nativeElement.textContent).toEqual('User List');
  });


  it('should get users from the service', () => {
    mockDataService.getUsers.and.returnValue(of(USERS));
    fixture.detectChanges();
    expect(fixture.componentInstance.users.length).toBe(3);
  });

  it('should have the route for each user', () => {
    mockDataService.getUsers.and.returnValue(of(USERS));
    fixture.detectChanges();
    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    const routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
    expect(routerLinks.length).toBe(4);
  });

  it('should create tr for each user in the database', () => {
    mockDataService.getUsers.and.returnValue(of(USERS));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.user-list')).length).toBe(3);
  });

  it('should have a edit button for each user in the database', () => {
    mockDataService.getUsers.and.returnValue(of(USERS));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.user-edit-btn')).length).toBe(3);
  });

  it('should have a delete button for each user in the database', () => {
    mockDataService.getUsers.and.returnValue(of(USERS));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.user-delete-btn')).length).toBe(3);
  });

});
