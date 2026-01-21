import { Component, inject, computed } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LocationStateService } from '../../../core/state/location-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  auth = inject(AuthService);
  locationState = inject(LocationStateService);
  private router = inject(Router);
  
  location = this.locationState.location;

  // Compute dashboard URL based on role
  dashboardUrl = computed(() => {
    const role = this.auth.role();
    if (role === 1) return '/dashboard/buyer';
    if (role === 2) return '/dashboard/agent';
    if (role === 3) return '/admin/analytics';
    return '/dashboard/buyer'; // fallback
  });

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  changeLocation() {
    this.locationState.clear();
    this.router.navigate(['/select-location']);
  }
}
