// task-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { TaskValuesType } from '../models/task-values-type.model';
import { Importance } from '../models/importance-property.model';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() cardContent: TaskValuesType | undefined;
  form!: FormGroup;
  importanceProperties: Importance[] = [];
  changeName: string = 'values changes';
  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getImportanceValues();
    this.populateEditValues(); // Call populateEditValues after creating the form
    this.form.valueChanges.subscribe((data) => {
      this.onValuesChanged(data);
    });
    console.log(this.cardContent, 'suiiiiiii');
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      title: [''],
      category: [''],
      dueDate: [null],
      estimate: this.formBuilder.group({
        id: [null],
        number: [null],
        unit: [''],
      }),
      importance: [null],
      status: [null],
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
    if (this.cardContent) {
      this.form.setValue({
        id: this.cardContent.id,
        title: this.cardContent.title,
        category: this.cardContent.category,
        dueDate: this.cardContent.dueDate,
        estimate: {
          id: this.cardContent.estimate.id,
          number: this.cardContent.estimate.number,
          unit: this.cardContent.estimate.unit,
        },
        importance: this.cardContent.importance,
        status: this.cardContent.status,
      });
    }
  }

  getImportanceValues(): void {
    this.importanceProperties = this.dashboardService.getImportanceValues();
  }

  onValuesChanged(data: TaskValuesType): void {
    console.log('data that should change #edit text', data);
    this.dashboardService.onAnyFormControlChange(data, this.changeName);
  }
}
