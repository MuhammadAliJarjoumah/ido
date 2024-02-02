import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ImportanceOptions } from '../dashboard/models/importance-options.model';
import { TaskStatus } from '../dashboard/models/task-status.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  taskStatus = TaskStatus;
  importanceOptions = ImportanceOptions;
  private newTodoItemSubject = new Subject<void>();

  newTodoItem$ = this.newTodoItemSubject.asObservable();

  addNewTodoItem(): void {
    this.newTodoItemSubject.next();
  }
}
