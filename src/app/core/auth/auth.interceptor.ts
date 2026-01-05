import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Auth interceptor - adds JWT token to outgoing requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('rm_token');

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
