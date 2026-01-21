import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Global error interceptor
 * Handles common HTTP errors and unauthorized access
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            // Unauthorized - clear session and redirect to login
            localStorage.clear();
            router.navigate(['/login']);
            errorMessage = 'Your session has expired. Please log in again.';
            break;
          case 403:
            // Permission denied - do NOT redirect; let UI handle gated states
            errorMessage = 'You do not have permission to access this resource.';
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          case 503:
            errorMessage = 'Service temporarily unavailable. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `Error: ${error.status}`;
        }
      }

      console.error('HTTP Error:', {
        status: error.status,
        message: errorMessage,
        url: error.url
      });

      // Return user-friendly error
      return throwError(() => ({
        ...error,
        userMessage: errorMessage
      }));
    })
  );
};
