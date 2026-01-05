import { Component, signal, OnInit, inject } from '@angular/core';
import { DashboardApi } from '../../../core/api/dashboard.api';

@Component({
  imports: [],
  templateUrl: './agent-dashboard.component.html',
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
