import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserSubscription } from '../../models/user-subscription';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected readonly baseUrl = environment.apiBaseUrl;

  constructor(protected http: HttpClient) { }

  get<T>(url: string) {
    return this.http
      .get<T>(`${this.baseUrl}${url}`)
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any) {
    return this.http
      .post<T>(`${this.baseUrl}${url}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any) {
    return this.http
      .put<T>(`${this.baseUrl}${url}`, body)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }

}
