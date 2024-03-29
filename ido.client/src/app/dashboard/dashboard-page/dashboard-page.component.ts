import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Importance } from '../models/importance-property.model';
import { ImportanceOptions } from '../models/importance-options.model';
import { DashboardService } from '../services/dashboard.service';
import { TaskValuesType } from '../models/task-values-type.model';
import { TaskStatus } from '../models/task-status.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  form!: FormGroup;
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
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this._sharedService.newTodoItem$.subscribe({
      next: (respones) => {
        console.log(respones, 'new task in adding mode');
        this.addNewTask();
      },
      error: (error) => {
        console.error('error:', error);
      },
    });
    this.form = this._formBuilder.group({
      card: [null],
    });
    this.form.valueChanges.subscribe((data) => {
      console.log(data, 'suiiiii changesssss');

      this.getTasks();
    });
  }

  drop(event: CdkDragDrop<TaskValuesType[]>, status: TaskStatus) {
    const movedTask = event.item.data;
    console.log(movedTask, 'movedTask');
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(status);
    } else {
      movedTask.status = status;
      console.log(movedTask.status, 'status');
      this.onStatusChanged(movedTask);
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
        this.filterTasks(response);
      },
      error: (error) => {
        console.error('error:', error);
      },
    });
  }

  filterTasks(tasks: TaskValuesType[]) {
    for (const task of tasks) {
      if (task.status == this.taskStatus.TODO) {
        this.todo.push(task);
      } else if (task.status == this.taskStatus.DOING) {
        this.doing.push(task);
      } else if (task.status == this.taskStatus.DONE) {
        this.done.push(task);
      }
    }
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
