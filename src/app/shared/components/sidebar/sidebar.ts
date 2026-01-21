import { Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  auth = inject(AuthService);
  
  get role() {
    return this.auth.role();
  }

  get isBuyer() {
    return this.auth.role() === 1;
  }

  get isAgent() {
    return this.auth.role() === 2;
  }

  get isAdmin() {
    return this.auth.role() === 3;
  }

  // Compute dashboard URL based on role
  dashboardUrl = computed(() => {
    const role = this.auth.role();
    if (role === 1) return '/dashboard/buyer';
    if (role === 2) return '/dashboard/agent';
    if (role === 3) return '/admin/analytics';
    return '/dashboard/buyer'; // fallback
  });
}
