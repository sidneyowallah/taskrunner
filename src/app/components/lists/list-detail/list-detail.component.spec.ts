import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListDetailComponent } from './list-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from './../../../data/data.service';

describe('List Detail Component', () => {

  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [
      RouterModule.forRoot([]),
      HttpClientTestingModule,
      ReactiveFormsModule,
      FormsModule,
    ],
    declarations: [ListDetailComponent] ,
    providers: [ ],
    schemas: [  NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(ListDetailComponent);
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

  it('should have h3 tag as \'Tasks Assigned to list\'', async(() => {
    const {fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h3tag = compile.querySelector('h3');
    expect(h3tag.textContent).toBe('Tasks Assigned to list');
  }));

});
