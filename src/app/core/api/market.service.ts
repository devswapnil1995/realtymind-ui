import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class MarketApi extends ApiService {


  getTrend(city: string, locality: string) {
    return this.get<any>(
      `/api/market/trend?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(locality)}`
    );
  }

  getAnalytics(city: string, locality: string) {
  return this.get<any>(
    `/api/market/trend/analytics?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(locality)}`
  );
}

  getAustinIndex() {
    return this.get<any>('/api/market/us/austin/index');
  }
}
