import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class DashboardApi extends ApiService {

  getBuyerDashboard() {
    return this.get<any>('/api/dashboard/buyer');
  }

  getAgentDashboard() {
    return this.get<any>('/api/dashboard/agent');
  }
}