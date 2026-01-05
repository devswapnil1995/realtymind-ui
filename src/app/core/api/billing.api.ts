import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

@Injectable({ providedIn: 'root' })
export class BillingApi extends ApiService {

  createCheckout(plan: string) {
    return this.post<{ checkoutUrl: string }>(
      '/api/subscriptions/checkout',
      {
        plan,
        frontendBaseUrl: window.location.origin
      }
    );
  }
}