import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
  ],
})
export class SharedModule {}
