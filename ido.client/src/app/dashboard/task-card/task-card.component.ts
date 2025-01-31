// task-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { TaskValuesType } from '../models/task-values-type.model';
import { Importance } from '../models/importance-property.model';
import { debounceTime } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TaskCardComponent,
    multi: true
  }
  ]
})
export class TaskCardComponent implements OnInit, ControlValueAccessor {
  @Input() cardContent: TaskValuesType | undefined;
  form!: FormGroup;
  importanceProperties: Importance[] = [];
  changeName: string = 'values changes';

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) { }
  // onTouched(obj: any) => void;
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.createForm();
    this.getImportanceValues();
    this.populateEditValues();
    this.form.valueChanges.pipe(debounceTime(1200)).subscribe((data) => {
      this.onValuesChanged(data);
      this.cardContent = data;
      console.log("Card Content", this.cardContent);
      // this.populateEditValues();
    });
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
    return this.estimate.get('number');
  }

  get unit() {
    return this.estimate.get('unit');
  }
  get estimateId() {
    return this.estimate?.get('id');
  }
  get importance() {
    return this.form.get('importance');
  }

  populateEditValues() {
    if (this.cardContent) {
      this.form.patchValue({
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

  onFormChange(task: TaskValuesType) {
    this.sharedService.updateTask(task);
  }
}