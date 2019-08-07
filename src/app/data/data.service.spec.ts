import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { User } from './user';
import { Task } from './task';
import { List } from './list';

describe('DataService', () => {

  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataService],
    });

    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });


  it('Data service should be created', () => {
    expect(service).toBeTruthy();
  });

  // -USER REQUESTS //

  // --POST REQUEST

  it('should post user to the API via POST', () => {
    const mockUser = { id: 5, userName: 'sidneyowallah5' };
    service.createUser(mockUser).subscribe(userData => {
      expect(userData.id).toEqual(5);
      expect(userData.userName).toEqual('sidneyowallah5');
    });
    const request = httpMock.expectOne(`${service.url}/users`);
    expect(request.request.method).toBe('POST');
    request.flush(mockUser);
  });

  // --GET USERS REQUEST

  it('should get users from the API via GET', () => {
    const mockUsers = [
      { id: 1, userName: 'sidneyowallah1' },
      { id: 2, userName: 'sidneyowallah2' },
      { id: 3, userName: 'sidneyowallah3' }
    ];
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3);
      expect(users).toEqual(mockUsers);
    });
    const request = httpMock.expectOne(`${service.url}/users`);
    expect(request.request.method).toBe('GET');
    request.flush(mockUsers);
  });

  // --GET USER REQUEST

  it('should get user from the API via GET', () => {
    const mockParam = 1;
    const mockUser = [
      { id: 3, userName: 'sidneyowallah3' }
     ];
    service.getUser(1).subscribe(user => {
      expect(user.length).toBe(1);
      expect(user).toEqual(mockUser);
    });
    const request = httpMock.expectOne(`${service.url}/users/${mockParam}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  });


  // -TASKS REQUESTS //

  // --POST REQUEST

  it('should post task to the API via POST', () => {
    const mockTask = {
      id: 1,
      taskName: 'Task 1',
      taskDescription: 'Task 1 Description',
      taskStatus: 'completed',
      user: 'SidneyOwallah1'
    };

    service.createTask(mockTask).subscribe(task => {
      expect(task.id).toEqual(1);
      expect(task.taskName).toEqual('Task 1');
      expect(task.taskDescription).toEqual('Task 1 Description');
      expect(task.taskStatus).toEqual('completed');
      expect(task.user).toEqual('SidneyOwallah1');
    });
    const request = httpMock.expectOne(`${service.url}/tasks/`);
    expect(request.request.method).toBe('POST');
    request.flush(mockTask);
  });

  // --GET TASKS REQUEST

  it('should get tasks from the API via GET', () => {
    const mockTasks = [
      { id: 1, taskName: 'Task 1', taskDescription: 'Task 1 Description', taskStatus: 'completed', user: 'SidneyOwallah1' },
      { id: 2, taskName: 'Task 2', taskDescription: 'Task 2 Description', taskStatus: 'in progress', user: 'SidneyOwallah2' },
      { id: 3, taskName: 'Task 3', taskDescription: 'Task 3 Description', taskStatus: 'not started', user: 'SidneyOwallah3' },
    ];
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(3);
      expect(tasks).toEqual(mockTasks);
    });
    const request = httpMock.expectOne(`${service.url}/tasks`);
    expect(request.request.method).toBe('GET');
    request.flush(mockTasks);
  });

  // --GET TASK REQUEST

  it('should get task from the API via GET', () => {
    const mockParam = 1;
    const mockTask = [
      { id: 1, taskName: 'Task 1', taskDescription: 'Task 1 Description', taskStatus: 'completed', user: 'SidneyOwallah1' }
     ];
    service.getTask(mockParam).subscribe(task => {
      expect(task.length).toBe(1);
      expect(task).toEqual(mockTask);
    });
    const request = httpMock.expectOne(`${service.url}/tasks/${mockParam}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockTask);
  });



  // -LIST REQUESTS //

  // --POST REQUEST

  it('should post list to the API via POST', () => {
    const mockList = {
      id: 1,
      listName: 'List 1',
      listDescription: 'List 1 Description',
      tasks: 'Task1'
    };

    service.createList(mockList).subscribe(list => {
      expect(list.id).toEqual(1);
      expect(list.listName).toEqual('List 1');
      expect(list.listDescription).toEqual('List 1 Description');
      expect(list.tasks).toEqual('Task1');
    });
    const request = httpMock.expectOne(`${service.url}/lists/`);
    expect(request.request.method).toBe('POST');
    request.flush(mockList);
  });

  // --GET LISTS REQUEST

  it('should get lists from the API via GET', () => {
    const mockLists = [
      { id: 1, listName: 'List 1', listDescription: 'List 1 Description', tasks: 'Task1' },
      { id: 2, listName: 'List 2', listDescription: 'List 2 Description', tasks: 'Task2' },
      { id: 3, listName: 'List 3', listDescription: 'List 3 Description', tasks: 'Task3' },
    ];
    service.getLists().subscribe(lists => {
      expect(lists.length).toBe(3);
      expect(lists).toEqual(mockLists);
    });
    const request = httpMock.expectOne(`${service.url}/lists`);
    expect(request.request.method).toBe('GET');
    request.flush(mockLists);
  });

  // --GET LIST REQUEST

  // it('should get list from the API via GET', () => {
  //   const mockParam = 1;
  //   const mockList: List[] = [
  //     { id: 1, listName: 'List 1', listDescription: 'List 1 Description', tasks: 'Task1' }
  //    ];
  //   service.getList(mockParam).subscribe(list => {
  //     expect(list.length).toBe(1);
  //     expect(list).toEqual(mockList);
  //   });
  //   const request = httpMock.expectOne(`${service.url}/lists/${mockParam}`);
  //   expect(request.request.method).toBe('GET');
  //   request.flush(mockList);
  // });



   // --DELETE TASK REQUEST

  // it('should delete user from the API via DELETE', () => {
  //   const mockParam = 1;
  //   const mockLists: List[] = [
  //     { id: 1, listName: 'List 1', listDescription: 'List 1 Description', tasks: 'Task1' },
  //     { id: 2, listName: 'List 2', listDescription: 'List 2 Description', tasks: 'Task2' },
  //     { id: 3, listName: 'List 3', listDescription: 'List 3 Description', tasks: 'Task3' },
  //   ];
  //   const mockList = mockLists[0];
  //   const mockId = mockList.id;

  //   service.deleteList(1).subscribe(
  //     list => {
  //       console.log("this is the list :", mockLists.length);
  //       expect(list.length).toBe(2);
  //       expect(list).toEqual(mockId);
  //     });
  //   const request = httpMock.expectOne(`${service.url}/lists/${mockId}`);
  //   expect(request.request.method).toBe('DELETE');
  //   request.flush(mockId);
  // });



});
