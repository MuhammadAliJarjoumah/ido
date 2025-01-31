import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { ImportanceOptions } from '../models/importance-options.model';
import { Importance } from '../models/importance-property.model';
import { TaskStatus } from '../models/task-status.model';
import { TaskValuesType } from '../models/task-values-type.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  taskForm!: FormGroup;
  importanceProperties: Importance[] = [];
  importanceOptions = ImportanceOptions;
  doing: TaskValuesType[] = [];
  done: TaskValuesType[] = [];
  todo: TaskValuesType[] = [];
  taskStatus = TaskStatus;
  tasks: TaskValuesType[] = [];
  isTabShowed: boolean = false;
  userEmail: string | null = '';
  @Output() taskMoved = new EventEmitter<TaskValuesType>();
  changeName: string = 'status ';
  constructor(
    private _formBuilder: FormBuilder,
    private _dashboardService: DashboardService,
    private _sharedService: SharedService
  ) {
    this._sharedService.newTodoItem$.subscribe({
      next: (responses) => {
        console.log(responses, 'new task in adding mode');
        this.addNewTask();
      },
      error: (error) => {
        console.error('error:', error);
      },
    });
  }

  ngOnInit(): void {
    this.getTasks();
    this.taskForm = this._formBuilder.group({
      tasks: this._formBuilder.array([])
    });
    this.resetFormArray();
    this.populateFormArray();

    // this.form.valueChanges.pipe(debounceTime(1500)).subscribe((data) => {
    //   console.log(data, 'suiiiii changesssss');
    // });
    this._sharedService.tasks$.subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filterTasks();
      }
      // Update your task lists within the three columns accordingly
    });

  }

  private populateFormArray(): void {
    // Assuming 'todo', 'doing', and 'done' are arrays of tasks
    const formArray = this.taskForm.get('tasks') as FormArray;

    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
    this.tasks.forEach(task => {
      const taskFormGroup = this.createTaskFormGroup(task);
      formArray.push(taskFormGroup);
    });

    const todoFormArray = this.taskForm.get('tasks') as FormArray;
    this.todo.forEach(task => {
      todoFormArray.push(this.createTaskFormGroup(task));
    });
    const doingFormArray = this.taskForm.get('tasks') as FormArray;
    this.doing.forEach(task => {
      doingFormArray.push(this.createTaskFormGroup(task));
    });

    const doneFormArray = this.taskForm.get('tasks') as FormArray;
    this.done.forEach(task => {
      doneFormArray.push(this.createTaskFormGroup(task));
    });
  }

  private createTaskFormGroup(task: TaskValuesType): FormGroup {
    return this._formBuilder.group({
      id: [task.id],
      title: [task.title],
      category: [task.category],
      dueDate: [task.dueDate],
      estimate: this._formBuilder.group({
        id: [task.estimate.id],
        number: [task.estimate.number],
        unit: [task.estimate.unit],
      }),
      importance: [task.importance],
      status: [task.status],
    });
  }

  drop(event: CdkDragDrop<TaskValuesType[]>, status: TaskStatus) {
    const formArray = this.taskForm.get('tasks') as FormArray;
    const movedTaskFormGroup = formArray.at(event.previousIndex) as FormGroup;
    console.log("Moved Task", movedTaskFormGroup);
    if (event.previousContainer === event.container) {
      moveItemInArray(formArray.controls, event.previousIndex, event.currentIndex);
    } else {
      movedTaskFormGroup.get('status')?.setValue(status);
      this.onStatusChanged(movedTaskFormGroup.value);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onStatusChanged(data: TaskValuesType) {
    console.log('data that should change #Drag Drop', data);
    this._dashboardService.onAnyFormControlChange(data, this.changeName);
  }

  categoryUpdated() {
    console.log('category');
  }

  getTasks() {
    this._dashboardService.getTasks().subscribe({
      next: (response: TaskValuesType[]) => {
        console.log('response:', response);
        this.tasks = response;
        this.filterTasks();
      },
      error: (error) => {
        console.error('error:', error);
      },
    });
  }

  filterTasks() {
    this.taskForm.get('tasks')?.reset();

    // Assuming 'todo', 'doing', and 'done' are arrays of tasks
    const todoFormArray = this.taskForm.get('tasks') as FormArray;
    this.todo.forEach(task => {
      todoFormArray.push(this.createTaskFormGroup(task));
    });

    const doingFormArray = this.taskForm.get('tasks') as FormArray;
    this.doing.forEach(task => {
      doingFormArray.push(this.createTaskFormGroup(task));
    });

    const doneFormArray = this.taskForm.get('tasks') as FormArray;
    this.done.forEach(task => {
      doneFormArray.push(this.createTaskFormGroup(task));
    });
  }
  private resetFormArray(): void {
    const formArray = this.taskForm.get('tasks') as FormArray;
    formArray.clear();
  }
  addNewTask() {
    const taskItem: TaskValuesType = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: '',
      category: '',
      dueDate: '',
      estimate: {
        id: 0,
        number: 0,
        unit: '',
      },
      importance: this.importanceOptions.LOW,
      status: this.taskStatus.TODO,
    };
    this._dashboardService.addNewTask(taskItem).subscribe({
      next: (response: TaskValuesType) => {
        taskItem.id = response.id;
        this.todo.unshift(taskItem);
        console.log('New task added successfully', response);
      },
      error: (error) => {
        console.error('Error adding new task:', error);
        if (error && error.error && error.error.errors) {
          console.error('Server errors:', error.error.errors);
        }
      },
    });
  }
}
