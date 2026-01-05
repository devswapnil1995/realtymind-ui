import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.role() === 'Admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
