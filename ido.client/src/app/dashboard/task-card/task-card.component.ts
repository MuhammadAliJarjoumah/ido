import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Importance } from '../models/importance-property.model';
import { TaskValuesType } from '../models/task-values-type.model';
import { DashboardService } from '../services/dashboard.service';
import { TaskStatus } from '../models/task-status.model';
import { ImportanceOptions } from '../models/importance-options.model';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  form!: FormGroup;
  importanceProperties: Importance[] = [];
  selectedImportance: ImportanceOptions | null = null;
  @Input() cardContent: TaskValuesType | undefined;
  @Input() taskStatus: TaskStatus = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    // console.log('suiiiiii', this.cardContent);
    this.createForm();
    this.getImportanceValues();
    this.form.valueChanges.subscribe((data) => {
      console.log('Form changes', data);
      this.onAnyformControlChange(data);
    });
  }

  get id() {
    return this.form.get('id');
  }
  get title() {
    return this.form.get('title');
  }

  get category() {
    return this.form.get('category');
  }

  get dueDate() {
    return this.form.get('dueDate');
  }

  get estimate() {
    return this.form.get('estimate');
  }
  get number() {
    return this.estimate?.get('number');
  }

  get unit() {
    return this.estimate?.get('unit');
  }
  get estimateId() {
    return this.estimate?.get('id');
  }
  get importance() {
    return this.form.get('importance');
  }

  populateEditValues() {
    this.form.setValue({
      id: this.cardContent?.id,
      title: this.cardContent?.title,
      category: this.cardContent?.category,
      dueDate: this.cardContent?.dueDate,
      estimate: {
        id: this.cardContent?.estimate?.id,
        number: this.cardContent?.estimate?.number,
        unit: this.cardContent?.estimate?.unit,
      },
      importance: this.cardContent?.importance,
    });
  }

  createForm() {
    this.form = this._formBuilder.group({
      id: [null],
      title: [''],
      category: [''],
      dueDate: [null],
      estimate: this._formBuilder.group({
        id: [null],
        number: [null],
        unit: [''],
      }),
      importance: [null],
    });

    this.populateEditValues();
  }

  getImportanceValues() {
    this.importanceProperties = [
      { optionEnum: 0, value: '-' },
      { optionEnum: 1, value: 'Low' },
      { optionEnum: 2, value: 'Medium' },
      { optionEnum: 3, value: 'High' },
    ];
    this.selectedImportance = this.cardContent?.importance || null;
  }

  onAnyformControlChange(data: TaskValuesType) {
    const taskId = this.cardContent?.id;
    this._dashboardService.updateTaskById(taskId, data).subscribe({
      next: (response) => {
        console.log('Update successful', response);
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }
}
