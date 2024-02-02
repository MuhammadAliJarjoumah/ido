import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { ImportanceOptions } from 'src/app/dashboard/models/importance-options.model';
import { TaskStatus } from 'src/app/dashboard/models/task-status.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {
  importanceOptions = ImportanceOptions;
  taskStatus = TaskStatus;
  userEmail: string | null = '';
  isTabShowed: boolean = false;

  constructor(
    private _authenticationService: AuthenticationService,
    private sharedService: SharedService
  ) {}
  addNewTask(): void {
    this.sharedService.addNewTodoItem();
  }

  getUserDetails() {
    this.userEmail = this._authenticationService.getLoggedInUserEmail();
  }
  showTab() {
    this.isTabShowed = !this.isTabShowed;
  }
}
