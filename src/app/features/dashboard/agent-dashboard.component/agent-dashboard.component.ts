import { Component, signal, OnInit, inject } from '@angular/core';
import { DashboardApi } from '../../../core/api/dashboard.api';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner.component/error-banner.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state.component/empty-state.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton.component/skeleton.component';
import { CardComponent } from '../../../shared/ui/card.component/card.component';

@Component({
  imports: [CardComponent, SkeletonComponent, EmptyStateComponent, ErrorBannerComponent],
  template: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit {

  data = signal<any>(null);

  private api = inject(DashboardApi);
  constructor() { }

  ngOnInit() {
    this.api.getAgentDashboard()
      .subscribe(res => this.data.set(res));
  }
}
