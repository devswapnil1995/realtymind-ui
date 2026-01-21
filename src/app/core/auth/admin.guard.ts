import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.role() === 3) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
