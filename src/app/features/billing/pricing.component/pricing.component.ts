import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/ui/card.component/card.component';
import { BillingApi } from '../../../core/api/billing.api';

@Component({
  selector: 'app-pricing',
  imports: [CardComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {

  private billing = inject(BillingApi);

  subscribe(plan: 'pro' | 'agent') {
    this.billing.createCheckout(plan)
      .subscribe(res => {
        window.location.href = res.checkoutUrl;
      });
  }
}
