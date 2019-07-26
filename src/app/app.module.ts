import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { NewTaskComponent } from './components/tasks/new-task/new-task.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { NewListComponent } from './components/lists/new-list/new-list.component';
import { ListComponent } from './components/lists/list/list.component';
import { ListDetailComponent } from './components/lists/list-detail/list-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NewUserComponent,
    EditUserComponent,
    UserListComponent,
    NewTaskComponent,
    EditTaskComponent,
    TaskListComponent,
    NewListComponent,
    ListComponent,
    ListDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
