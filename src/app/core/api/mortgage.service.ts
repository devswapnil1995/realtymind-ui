import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class MortgageApi extends ApiService {

  getRates(region = 'IN') {
    return this.get<any>(`/api/finance/rates?region=${region}`);
  }

  calculateEmi(payload: any) {
    return this.post<any>(`/api/finance/mortgage/calc`, payload);
  }
}
