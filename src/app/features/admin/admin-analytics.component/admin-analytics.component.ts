import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api/api.service';
import { SkeletonComponent } from '../../../shared/ui/skeleton.component/skeleton.component';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner.component/error-banner.component';

@Component({
  standalone: true,
  selector: 'app-admin-analytics',
  imports: [CommonModule, SkeletonComponent, ErrorBannerComponent],
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss']
})
export class AdminAnalyticsComponent implements OnInit {

  loadingKpis = signal(false);
  loadingFeatures = signal(false);
  loadingPlans = signal(false);
  loadingUsers = signal(false);
  error = signal('');

  kpis = signal<any>(null);
  features = signal<any[]>([]);
  plans = signal<any[]>([]);
  users = signal<any[]>([]);
  private api = inject(ApiService);

  constructor() { }

  ngOnInit() {
    this.loadingKpis.set(true);
    this.api.get('/api/admin/kpis/snapshot')
      .subscribe({
        next: res => {
          this.kpis.set(res);
          console.log('KPI Data:', this.kpis());
        },
        error: () => this.error.set('Failed to load KPIs'),
        complete: () => this.loadingKpis.set(false)
      });

    this.loadingFeatures.set(true);
    this.api.get('/api/admin/analytics/usage/features')
      .subscribe({
        next: res => { this.features.set(res as any[]); console.log(this.features()); },
        error: () => this.error.set('Failed to load features'),
        complete: () => this.loadingFeatures.set(false)
      });

    this.loadingPlans.set(true);
    this.api.get('/api/admin/analytics/usage/plans')
      .subscribe({
        next: res => { this.plans.set(res as any[]); console.log(this.plans()); },
        error: () => this.error.set('Failed to load plans'),
        complete: () => this.loadingPlans.set(false)
      });

    this.loadingUsers.set(true);
    this.api.get('/api/admin/analytics/usage/top-users')
      .subscribe({
        next: res => { this.users.set(res as any[]); console.log(this.users()); },
        error: () => this.error.set('Failed to load users'),
        complete: () => this.loadingUsers.set(false)
      });
  }
}
