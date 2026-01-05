import { Component } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  imports: [DatePipe],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUsersComponent {
 users: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<any[]>('/api/admin/users')
      .subscribe(res => this.users = res);
  }

  changeRole(user: any, role?: string) {
  this.api.put(`/api/admin/users/${user.id}/role`, { role })
    .subscribe(() => user.role = role);
}

toggleActive(user: any) {
  this.api.put(`/api/admin/users/${user.id}/status`,
    { isActive: !user.isActive })
    .subscribe(() => user.isActive = !user.isActive);
}
}