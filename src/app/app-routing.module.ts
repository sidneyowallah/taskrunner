import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { NewTaskComponent } from './components/tasks/new-task/new-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { NewListComponent } from './components/lists/new-list/new-list.component';
import { ListComponent } from './components/lists/list/list.component';
import { ListDetailComponent } from './components/lists/list-detail/list-detail.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

const routes: Routes = [
  { path: 'lists/new', component: NewListComponent },
  { path: 'lists/:id', component: ListDetailComponent },
  { path: 'lists', component: ListComponent },
  { path: 'users/new', component: NewUserComponent },
   { path: 'users/:id', component: EditUserComponent },
  { path: 'users', component: UserListComponent },
  { path: 'tasks/new', component: NewTaskComponent },
  { path: 'tasks/:id', component: EditTaskComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '',   redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
