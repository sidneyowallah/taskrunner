import { Injectable } from '@angular/core';
import { User } from './user';
import { Task } from './task';
import { List } from './list';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {  headers: this.headers  };

  constructor(private http: HttpClient) { }

// User requests

  // Update User
  createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.url + '/users', user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update User
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users', this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Get User
  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.url + `/users/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update User
  updateUser(id, data): Observable<User[]> {
    return this.http.put<User[]>(this.url + `/users/${id}`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete User
  deleteUser(id): Observable<User[]> {
    return this.http.delete<User[]>(this.url + `/users/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


// Tasks requests

  // Create Task
  createTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(this.url + `/tasks/`, task, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // Get Tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + '/tasks', this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Get Task
  getTask(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + `/tasks/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update Task
  updateTask(id, data): Observable<Task[]> {
    return this.http.put<Task[]>(this.url + `/tasks/${id}`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Task
  deleteTask(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(this.url + `/tasks/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


// List requests
  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.url + '/lists', this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Get Lists
  getList(id: number): Observable<any> {
    return this.http.get<any>(this.url + `/lists/${id}`, this.httpOptions).pipe(
      map((list) => list.tasks),
      catchError(this.handleError)
    );
  }

  // Create Lists
  createList(list: List): Observable<List[]> {
    return this.http.post<List[]>(this.url + `/lists/`, list, this.httpOptions).pipe(
    catchError(this.handleError)
    );
  }

  // Update List
  updateList(id: number, data): Observable<Task[]> {
    return this.http.put<Task[]>(this.url + `/lists/${id}`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete List
  deleteList(id: number): Observable<List[]> {
    return this.http.delete<List[]>(this.url + `/lists/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
