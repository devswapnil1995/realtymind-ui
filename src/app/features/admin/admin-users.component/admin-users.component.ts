import { Component, signal } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUsersComponent {
  users = signal<any[]>([]);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get<any[]>('/api/admin/users')
      .subscribe(res => this.users.set(res));
  }


  changeRole(user: any, newRole: string) {
    const confirmed = confirm(
      `Change role of ${user.email} to ${newRole}?`
    );

    if (!confirmed) return;

    this.api.put(`/api/admin/users/${user.id}/role`, { role: newRole }).subscribe({
      next: () => {
        user.role = newRole;
      }
    });
  }


  deactivateUser(user: any) {
    const confirmed = confirm(
      `Are you sure you want to deactivate ${user.email}?`
    );

    if (!confirmed) {
      return; // ⛔ STOP action
    }

    // ✅ Proceed only after confirmation
    this.api.put(`/api/admin/users/${user.id}/status`,
      { isActive: !user.isActive }).subscribe({
        next: () => {
          user.isActive = !user.isActive;
        },
        error: () => {
          alert('Failed to deactivate user. Please try again.');
        }
      });
  }

}