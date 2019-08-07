import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from './../../../data/data.service';

describe('Task List Component', () => {

  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [
      RouterModule.forRoot([]),
      HttpClientTestingModule,
      ReactiveFormsModule,
      FormsModule,
    ],
    declarations: [TaskListComponent ],
    providers: [ ],
    schemas: [  NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));


  function setup() {
    const fixture = TestBed.createComponent(TaskListComponent);
    const comp = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(
      DataService
    );
    return { fixture, comp, dataService };
  }

  it('should create the component', async(() => {
    const { comp } = setup();
    expect(comp).toBeTruthy();
  }));

  it('should have h3 tag as \'Task List\'', async(() => {
    const {fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h3tag = compile.querySelector('h3');
    expect(h3tag.textContent).toBe('Task List');
  }));

});
