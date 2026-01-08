import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';

@Component({
  standalone: true,
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss']
})
export class AdminAnalyticsComponent implements OnInit {

  kpis: any;
  features: any[] = [];
  plans: any[] = [];
  users: any[] = [];
  private api = inject(ApiService);

  constructor() {}

  ngOnInit() {
    this.api.get('/api/admin/kpis/snapshot')
      .subscribe(res => this.kpis = res);

    this.api.get('/api/admin/analytics/features')
      .subscribe(res => this.features = res as any[]);

    this.api.get('/api/admin/analytics/plans')
      .subscribe(res => this.plans = res as any[]);

    this.api.get('/api/admin/analytics/top-users')
      .subscribe(res => this.users = res as any[]);
  }
}
