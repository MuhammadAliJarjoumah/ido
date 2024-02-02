import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'https://localhost:7065/api/Account/';
  private loggedInUserEmail: string | null = null;
  constructor(private _http: HttpClient) {}

  login(loginObj: any): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}authinticate`, loginObj).pipe(
      tap(response => {
        const loggedInUserEmail = response?.email;
        if (loggedInUserEmail) {
          this.setLoggedInUserEmail(loggedInUserEmail);
        }
      })
    );
  }


  setLoggedInUserEmail(email: string): void {
    this.loggedInUserEmail = email;
  }

  getLoggedInUserEmail(): string | null {
    return this.loggedInUserEmail;
  }
}
