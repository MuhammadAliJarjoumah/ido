import ImportancesValues from '../jsons/importance-values.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskValuesType } from '../models/task-values-type.model';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  importancesValues = ImportancesValues;
  private baseUrl: string = 'https://localhost:7065/api/Tasks/';

  constructor(private _http: HttpClient) {}

  getTasks(): Observable<TaskValuesType[]> {
    return this._http.get<TaskValuesType[]>(`${this.baseUrl}`);
  }

  addNewTask(taskDetails: TaskValuesType): Observable<TaskValuesType> {
    return this._http.post<TaskValuesType>(`${this.baseUrl}`, taskDetails);
  }

  updateTaskById(updatedData: TaskValuesType): Observable<any> {
    const url = `${this.baseUrl}${updatedData.id}/`;
    return this._http.put(url, updatedData);
  }

  updateTask(data: TaskValuesType) {
    return this._http.patch<TaskValuesType>(`${this.baseUrl}${data.id}`, data);
  }

  getImportanceValues() {
    return this.importancesValues;
  }

  onAnyFormControlChange(data: TaskValuesType,changeType:string): void {
    this.updateTaskById(data).subscribe({
      next: (response) => {
        console.log('Update successful',changeType, response);
      },
      error: (error) => {
        console.error('Error updating ',changeType, error);
      },
    });
  }
}
