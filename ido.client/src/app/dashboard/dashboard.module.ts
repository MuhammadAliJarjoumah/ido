import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { SharedModule } from '../shared/shared.module';
import { TaskCardComponent } from './task-card/task-card.component';
const routes: Routes = [
  {
    component: DashboardPageComponent,
    path: 'dashboard',
  },
];

@NgModule({
  declarations: [DashboardPageComponent, TaskCardComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  exports: [TaskCardComponent],
})
export class DashboardModule {}
