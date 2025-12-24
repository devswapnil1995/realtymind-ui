import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected readonly baseUrl = environment.apiBaseUrl;

  constructor(protected http: HttpClient) {}

  protected get<T>(url: string) {
    return this.http
      .get<T>(`${this.baseUrl}${url}`)
      .pipe(catchError(this.handleError));
  }

  protected post<T>(url: string, body: any) {
    return this.http
      .post<T>(`${this.baseUrl}${url}`, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
