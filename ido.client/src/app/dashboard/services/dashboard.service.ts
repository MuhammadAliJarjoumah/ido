import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskValuesType } from '../models/task-values-type.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl: string = 'https://localhost:7065/api/Tasks/';
  constructor(private _http: HttpClient) {}

  getTasks(): Observable<TaskValuesType[]> {
    return this._http.get<TaskValuesType[]>(`${this.baseUrl}`);
  }

  addNewTask(taskDetails: TaskValuesType): Observable<TaskValuesType> {
    return this._http.post<TaskValuesType>(`${this.baseUrl}`, taskDetails);
  }

  updateTaskById(taskId: any, updatedData: TaskValuesType): Observable<any> {
    const url = `${this.baseUrl}${taskId}/`;
    return this._http.put(url, updatedData);
  }
}
