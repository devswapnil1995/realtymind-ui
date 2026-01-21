import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard to protect Buyer-only routes
 * Redirects non-buyers to their appropriate dashboard
 */
export const buyerGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.role();

  if (role === 1) { // Buyer
    return true;
  }

  // Redirect to appropriate dashboard based on role
  if (role === 2) { // Agent
    router.navigate(['/dashboard/agent']);
    return false;
  }

  if (role === 3) { // Admin
    router.navigate(['/admin/analytics']);
    return false;
  }

  // Not authenticated
  router.navigate(['/login']);
  return false;
};
