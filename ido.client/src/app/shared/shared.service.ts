import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import { ImportanceOptions } from '../dashboard/models/importance-options.model';
import { TaskValuesType } from '../dashboard/models/task-values-type.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  importanceOptions = ImportanceOptions;
  private newTodoItemSubject = new Subject<void>();
  private dataArraySubject = new BehaviorSubject<Array<Object>>([]);
  dataArray$ = this.dataArraySubject.asObservable();
  newTodoItem$ = this.newTodoItemSubject.asObservable();
  private tasksSubject = new Subject<TaskValuesType[]>();
  tasks$ = this.tasksSubject.asObservable().pipe(
    debounceTime(1000)
  );

  updateTask(task: TaskValuesType) {
    let tasksVariable: TaskValuesType[];
    this.tasksSubject.subscribe({
      next: (tasks) => {
        tasksVariable = tasks;
        const index = tasksVariable.findIndex(t => t.id === task.id);
        if (index !== -1) {
          tasksVariable[index] = task;
          this.tasksSubject.next(tasksVariable);
        }
      }
    });
  }

  addNewTodoItem(): void {
    this.newTodoItemSubject.next();
  }
}
